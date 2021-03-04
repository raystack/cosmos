/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-var-requires */
// Cube.js configuration options: https://cube.dev/docs/config
const fetch = require('node-fetch');

const ENIGMA_URL = process.env.ENIGMA_URL || 'http://localhost:8000';

class EnigmaSchemaRepository {
  async dataSchemaFiles() {
    const cubes = await this.getCubes();
    return cubes.map((cube) => ({
      fileName: cube.tableName,
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

module.exports = {
  repositoryFactory: () => new EnigmaSchemaRepository()
};
