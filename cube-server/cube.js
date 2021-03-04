/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-var-requires */
// Cube.js configuration options: https://cube.dev/docs/config
const fetch = require('node-fetch');
const PostgresDriver = require('@cubejs-backend/postgres-driver');

const COSMOS_URL = process.env.COSMOS_URL || 'http://localhost:8000';

class CosmosSchemaRepository {
  async dataSchemaFiles() {
    const cubes = await this.getCubes();
    return cubes.map((cube) => ({
      fileName: cube.tableName,
      content: cube.content
    }));
  }

  async getCubes() {
    const { data: cubes } = await fetch(`${COSMOS_URL}/api/cubes`)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return cubes;
  }
}

async function getConnection(urn) {
  return fetch(`${COSMOS_URL}/api/connections/${urn}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

async function getCubesMetaData() {
  return fetch(`${COSMOS_URL}/api/meta/cubes`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

async function driverFactory(driverContext) {
  const defaultConfig = { readOnly: true };
  const { dataSource } = driverContext;
  const { data: connection } =
    dataSource !== 'default' ? await getConnection(dataSource) : {};
  if (connection.type === 'postgres') {
    return new PostgresDriver({ ...connection.credentials, ...defaultConfig });
  }
  return null;
}

async function schemaVersion() {
  const { data } = await getCubesMetaData();
  const { total, lastUpdatedAt } = data;
  return `${total}-${lastUpdatedAt}`;
}

module.exports = {
  apiSecret: 'apiSecret', // It is just a placeholder, we dont use it
  dbType: 'postgres', // TODO: need to call connection api to get
  repositoryFactory: () => new CosmosSchemaRepository(),
  checkAuth: (req, auth) => { },
  driverFactory,
  schemaVersion
};
