import * as Handler from './handler';
import Hapi from '@hapi/hapi'

module.exports = {
  name: 'health',
  version: '1.0.0',
  register(server: Hapi.Server) {
    server.route([
      {
        method: 'GET',
        path: '/ping',
        options: Handler.ping
      }
    ]);
  }
};
