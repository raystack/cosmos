import { CubejsServerCore } from '@cubejs-backend/server-core';
import { BaseDriver } from '@cubejs-backend/query-orchestrator';
import {
  SupportedDBType,
  IPGTablesDetails,
  ITableListItem,
  IPGTablesResult
} from 'src/types';
import { ScaffoldingTemplate } from '@cubejs-backend/schema-compiler/dist/src/scaffolding/ScaffoldingTemplate';
import { ScaffoldingSchema } from '@cubejs-backend/schema-compiler/dist/src/scaffolding/ScaffoldingSchema';

const PG_TABLE_QUERY = `SELECT table_name, table_schema FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public';`;
const PG_DESCRIBE_TABLE_QUERY = `SELECT table_catalog, table_name, column_name, data_type FROM information_schema.columns WHERE table_name=$1;`;

type Config = Record<string, string | number | boolean>;

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function santitizedCubeName(name: string) {
  const patt = /^[a-z0-9_]+$/;
  const camelCaseName = name.split('-').map(capitalize).join('');
  return patt.test(camelCaseName) ? camelCaseName : `Cube${camelCaseName}`;
}

function sanitizeTableSchema(tableSchame: { cube: string; joins: any[] }) {
  const joins = tableSchame.joins.map((j) => {
    return { ...j, cubeToJoin: santitizedCubeName(j.cubeToJoin) };
  });
  return { ...tableSchame, cube: santitizedCubeName(tableSchame.cube), joins };
}

export default class ConnectionProvider {
  config: Config;

  dbType: SupportedDBType;

  driver: BaseDriver;

  constructor(type: SupportedDBType, config: Config) {
    this.dbType = type;
    this.config = config;
    this.driver = this.getDriver();
  }

  private getDriverModule() {
    // eslint-disable-next-line import/no-dynamic-require, @typescript-eslint/no-var-requires, global-require
    const module = require(CubejsServerCore.driverDependencies(this.dbType));
    // eslint-disable-next-line new-cap
    return module.default ? module.default : module;
  }

  private getDriver(): BaseDriver {
    const Module = this.getDriverModule();
    const config: Config = {
      ...this.config,
      readOnly: true
    };
    if (this.dbType === 'bigquery' && this.config.credentials) {
      const credentials = JSON.parse(
        Buffer.from(<string>this.config.credentials, 'base64').toString('utf8')
      );
      config.credentials = credentials;
    }
    return new Module(config);
  }

  public async test(): Promise<'Success' | 'Failure'> {
    try {
      await this.driver.testConnection();
      return 'Success';
    } catch (err) {
      console.log(err);
      return 'Failure';
    }
  }

  private async getPGTablesList(): Promise<ITableListItem[]> {
    const tables = <IPGTablesResult[]>(
      await this.driver.query(PG_TABLE_QUERY, [])
    );
    return tables.map(({ table_schema: schema, table_name: table }) => ({
      name: table,
      id: `${schema}.${table}`
    }));
  }

  public async getTablesList(): Promise<ITableListItem[]> {
    switch (this.dbType) {
      case 'postgres':
        return this.getPGTablesList();
      default: {
        const schemas = await this.driver.tablesSchema();
        return Object.keys(schemas).reduce((acc, schema) => {
          const tables: ITableListItem[] = Object.keys(
            schemas[schema]
          ).map((table) => ({ name: table, id: `${schema}.${table}` }));
          return [...acc, ...tables];
        }, <ITableListItem[]>[]);
      }
    }
  }

  public async getPGTablesDetails(
    tableId: string
  ): Promise<IPGTablesDetails[]> {
    return <Promise<IPGTablesDetails[]>>(
      this.driver.query(PG_DESCRIBE_TABLE_QUERY, [tableId])
    );
  }

  public async getTablesDetails(
    tableId: string
  ): Promise<IPGTablesDetails[] | unknown> {
    const [schema, table] =
      tableId.match(/(["`].*?["`]|[^`".]+)+(?=\s*|\s*$)/g) || [];

    switch (this.dbType) {
      case 'postgres':
        return this.getPGTablesDetails(table || tableId);
      default: {
        if (!schema || !table) {
          throw new Error(
            `Incorrect format for '${tableId}'. Should be in '<schema>.<table>' format`
          );
        }
        const schemas = await this.driver.tablesSchema();
        return schemas[schema][table];
      }
    }
  }

  public async getTableCube(
    tableId: string,
    dataSource: string
  ): Promise<string> {
    const schemas = await this.driver.tablesSchema();
    const template = new ScaffoldingTemplate(schemas, this.driver);
    const scaffoldingSchema = new ScaffoldingSchema(schemas);
    scaffoldingSchema.prepareTableNamesToTables([tableId]);
    const tableSchema = scaffoldingSchema.tableSchema(tableId, true);
    return template.renderFile(
      template.schemaDescriptorForTable(sanitizeTableSchema(tableSchema), {
        dataSource
      })
    );
  }

  public async getConnectionTablesCubes(
    dataSource: string
  ): Promise<Array<ITableListItem & { cube: string }>> {
    const schemas = await this.driver.tablesSchema();
    const template = new ScaffoldingTemplate(schemas, this.driver);
    const scaffoldingSchema = new ScaffoldingSchema(schemas);
    const tables = await this.getTablesList();
    const tableIds = tables.map((table) => table.id);
    scaffoldingSchema.prepareTableNamesToTables(tableIds);
    return Promise.all(
      tables.map(async (table) => {
        const tableSchema = scaffoldingSchema.tableSchema(table.id, true);
        return {
          ...table,
          cube: template.renderFile(
            template.schemaDescriptorForTable(
              sanitizeTableSchema(tableSchema),
              { dataSource }
            )
          )
        };
      })
    );
  }
}
