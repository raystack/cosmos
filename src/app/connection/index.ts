import Hapi from '@hapi/hapi';
import * as Handler from './handler';

module.exports = {
  name: 'connection',
  version: '1.0.0',
  register(server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/connections',
        options: Handler.list
      },
      {
        method: 'POST',
        path: '/connections',
        options: Handler.create
      }
    ]);
  }
};
