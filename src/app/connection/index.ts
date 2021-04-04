import Hapi from '@hapi/hapi';
import * as Handler from './handler';

export const plugin = {
  name: 'connection',
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
        method: 'POST',
        path: '/test',
        options: Handler.testCredentials
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
      {
        method: 'GET',
        path: '/{urn}/test',
        options: Handler.testConnection
      },
      {
        method: 'GET',
        path: '/{urn}/tables',
        options: Handler.listTables
      },
      {
        method: 'PUT',
        path: '/{urn}/tables',
        options: Handler.createTablesCubes
      },
      {
        method: 'GET',
        path: '/{urn}/tables/{table_name}',
        options: Handler.getTable
      },
      {
        method: 'GET',
        path: '/{urn}/tables/{table_name}/cube',
        options: Handler.getTableCube
      }
    ]);
  }
};
