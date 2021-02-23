import { CubejsServerCore } from '@cubejs-backend/server-core';
import { BaseDriver } from '@cubejs-backend/query-orchestrator';
import { SupportedDBType, IPGTablesResult } from 'src/types';

const PG_TABLE_QUERY = `SELECT table_name FROM information_schema.tables WHERE table_type='BASE TABLE' AND table_schema='public';`;

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

  public async getPGTablesList(): Promise<string[]> {
    const tables = <IPGTablesResult[]>(
      await this.driver.query(PG_TABLE_QUERY, [])
    );
    return tables.map((t) => t.table_name);
  }

  public async getTablesList(): Promise<string[]> {
    switch (this.dbType) {
      case 'postgres':
        return this.getPGTablesList();
      default: {
        const schemas = await this.driver.tablesSchema();
        return Object.keys(schemas).reduce((acc: string[], schema: string) => {
          const tables = Object.keys(schemas[schema]).map(
            (table) => `${schema}.${table}`
          );
          return [...acc, ...tables];
        }, []);
      }
    }
  }
}
