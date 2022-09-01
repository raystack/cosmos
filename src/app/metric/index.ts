import Hapi from '@hapi/hapi';
import * as Handler from './handler';
import { META_ROUTES } from './meta';

export const plugin = {
  name: 'metric',
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
      },
      ...META_ROUTES
    ]);
  }
};
