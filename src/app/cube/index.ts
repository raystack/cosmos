import Hapi from '@hapi/hapi';
import * as Handler from './handler';

export const plugin = {
  name: 'cube',
  version: '1.0.0',
  register: (server: Hapi.Server): void => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: Handler.list
      },
      {
        method: 'POST',
        path: '/',
        options: Handler.create
      },
      {
        method: 'GET',
        path: '/{urn}',
        options: Handler.get
      },
      {
        method: 'PUT',
        path: '/{urn}',
        options: Handler.update
      }
    ]);
  }
};
