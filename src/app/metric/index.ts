import Hapi from '@hapi/hapi';
import * as Handler from './handler';

export const plugin = {
  name: 'metric',
  version: '1.0.0',
  register: (server: Hapi.Server): void => {
    server.route([
      {
        method: 'POST',
        path: '/',
        options: Handler.create
      },
      {
        method: 'GET',
        path: '/{urn}',
        options: Handler.get
      }
    ]);
  }
};
