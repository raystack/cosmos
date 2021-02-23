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
      },
      {
        method: 'GET',
        path: '/connections/{urn}',
        options: Handler.get
      },
      {
        method: 'PUT',
        path: '/connections/{urn}',
        options: Handler.update
      },
      {
        method: 'GET',
        path: '/connections-fields',
        options: Handler.getFields
      },
      {
        method: 'GET',
        path: '/connections/{urn}/test',
        options: Handler.testConnection
      },
      {
        method: 'GET',
        path: '/connections/{urn}/tables',
        options: Handler.listTables
      },
      {
        method: 'GET',
        path: '/connections/{urn}/tables/{table_name}',
        options: Handler.getTable
      }
    ]);
  }
};
