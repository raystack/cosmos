import Hapi from '@hapi/hapi';
import * as Handler from './handler';

module.exports = {
  name: 'cube',
  version: '1.0.0',
  register(server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/cubes',
        options: Handler.list
      }
    ]);
  }
};
