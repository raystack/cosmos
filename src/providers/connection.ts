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

export default class ConnectionProvider {
  credentials: Record<string, string | number>;

  dbType: SupportedDBType;

  driver: BaseDriver;

  constructor(
    type: SupportedDBType,
    credentials: Record<string, string | number>
  ) {
    this.dbType = type;
    this.credentials = credentials;
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
    return new Module({ ...this.credentials, readOnly: true });
  }

  public async test(): Promise<string> {
    try {
      const result = <unknown>await this.driver.testConnection();
      return result ? 'Success' : 'Failure';
    } catch (err) {
      console.log(err);
      return 'Failure';
    }
  }

  public async getPGTablesList(): Promise<ITableListItem[]> {
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
    tableName: string
  ): Promise<IPGTablesDetails[]> {
    return <Promise<IPGTablesDetails[]>>(
      this.driver.query(PG_DESCRIBE_TABLE_QUERY, [tableName])
    );
  }

  public async getTablesDetails(
    tableName: string
  ): Promise<IPGTablesDetails[] | unknown> {
    const [schema, table] =
      tableName.match(/(["`].*?["`]|[^`".]+)+(?=\s*|\s*$)/g) || [];

    switch (this.dbType) {
      case 'postgres':
        return this.getPGTablesDetails(table || tableName);
      default: {
        if (!schema || !table) {
          throw new Error(
            `Incorrect format for '${tableName}'. Should be in '<schema>.<table>' format`
          );
        }
        const schemas = await this.driver.tablesSchema();
        return schemas[schema][table];
      }
    }
  }

  public async getTableCube(tableName: string, urn: string): Promise<unknown> {
    const schemas = await this.driver.tablesSchema();

    const template = new ScaffoldingTemplate(schemas, this.driver);
    const scaffoldingSchema = new ScaffoldingSchema(schemas);
    scaffoldingSchema.prepareTableNamesToTables([tableName]);
    const tableSchema = scaffoldingSchema.tableSchema(tableName, true);
    return template.renderFile(
      template.schemaDescriptorForTable(tableSchema, { dataSource: urn })
    );
  }
}
