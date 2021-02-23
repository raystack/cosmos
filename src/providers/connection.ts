import { DatabaseType, CubejsServerCore } from '@cubejs-backend/server-core';
import { BaseDriver } from '@cubejs-backend/query-orchestrator';

export default class ConnectionProvider {
  credentials: Record<string, string | number>;

  dbType: DatabaseType;

  driver: BaseDriver;

  constructor(
    type: DatabaseType,
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
    return new Module(this.credentials);
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
}
