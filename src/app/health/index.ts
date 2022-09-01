import Hapi from '@hapi/hapi';
import * as Handler from './handler';

export const plugin = {
  name: 'health',
  version: '1.0.0',
  register: (server: Hapi.Server): void => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: Handler.ping
      }
    ]);
  }
};
