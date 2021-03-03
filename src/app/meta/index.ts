import Hapi from '@hapi/hapi';
import * as Handler from './handler';

export const plugin = {
  name: 'meta',
  version: '1.0.0',
  register: async (server: Hapi.Server) => {
    server.route([
      {
        method: 'GET',
        path: '/cubes',
        options: Handler.getCubesMetaData
      }
    ]);
  }
};
