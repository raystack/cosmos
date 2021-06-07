/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-var-requires */
// Cube.js configuration options: https://cube.dev/docs/config
const fetch = require('node-fetch');
const PostgresDriver = require('@cubejs-backend/postgres-driver');
const BigQueryDriver = require('@cubejs-backend/bigquery-driver');
const MysqlDriver = require('@cubejs-backend/mysql-driver');
const SQLiteDriver = require('@cubejs-backend/sqlite-driver');

const ENIGMA_URL = process.env.ENIGMA_URL || 'http://localhost:8000';

class EnigmaSchemaRepository {
  async dataSchemaFiles() {
    const cubes = await this.getCubes();
    return cubes.map((cube) => ({
      fileName: cube.tableId,
      content: cube.content
    }));
  }

  async getCubes() {
    const { data: cubes } = await fetch(`${ENIGMA_URL}/api/cubes`)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return cubes;
  }
}

async function getConnection(urn) {
  return fetch(`${ENIGMA_URL}/api/connections/${urn}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

async function getCubesMetaData() {
  return fetch(`${ENIGMA_URL}/api/meta/cubes`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

async function driverFactory(driverContext) {
  const defaultConfig = { readOnly: true };
  const { dataSource } = driverContext;
  const [type, urn] = dataSource ? dataSource.split('::') : ['sqlite'];
  const { data: connection } = urn ? await getConnection(urn) : {}

  if (connection && connection.type === 'postgres') {
    return new PostgresDriver({ ...connection.credentials, ...defaultConfig });
  }
  if (connection && connection.type === 'mysql') {
    return new MysqlDriver({ ...connection.credentials, ...defaultConfig });
  }
  if (connection && connection.type === 'bigquery') {
    const credentials = JSON.parse(
      Buffer.from(connection.credentials.credentials, 'base64').toString('utf8')
    );
    return new BigQueryDriver({
      ...connection.credentials,
      credentials,
      ...defaultConfig
    });
  }
  return new SQLiteDriver({
    database: 'default.db',
    ...defaultConfig
  });
}

function dbType(ctx) {
  const { dataSource } = ctx;
  const [type] = dataSource && dataSource !== 'default' ? dataSource.split('::') : ['sqlite'];
  return type;
}

async function schemaVersion() {
  const { data } = await getCubesMetaData();
  const { total, lastUpdatedAt } = data;
  return `${total}-${lastUpdatedAt}`;
}

module.exports = {
  apiSecret: 'apiSecret', // It is just a placeholder, we dont use it
  repositoryFactory: () => new EnigmaSchemaRepository(),
  checkAuth: (req, auth) => { },
  dbType,
  driverFactory,
  schemaVersion
};
