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
      },
      {
        method: 'POST',
        path: '/cubes',
        options: Handler.create
      },
      {
        method: 'GET',
        path: '/cubes/{urn}',
        options: Handler.get
      },
      {
        method: 'PUT',
        path: '/cubes/{urn}',
        options: Handler.update
      }
    ]);
  }
};
