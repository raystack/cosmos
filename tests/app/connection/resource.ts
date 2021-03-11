import Connection from 'src/models/connection';
import * as Resource from 'src/app/connection/resource';
import * as Transformer from 'src/app/connection/transformer';
import { IConnectionDocument, SupportedDBType } from 'src/types';
import ConnectionProvider from 'src/providers/connection';

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('src/providers/connection');

describe('Connection::Resource', () => {
  describe('list', () => {
    test('should return empty list', async () => {
      const spy = jest.spyOn(Connection, 'list').mockResolvedValueOnce([]);
      const expectedResult: IConnectionDocument[] = [];
      const result = await Resource.list();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    test('should pass urn to findByUrn', async () => {
      const connection = new Connection();
      const urn = 'test-urn';
      const spy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(connection);
      const transformerSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});
      await Resource.get(urn);
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);

      expect(transformerSpy).toHaveBeenCalledWith(connection);
      expect(transformerSpy).toHaveBeenCalledTimes(1);
    });

    test('should return null if connection not found', async () => {
      const urn = 'test-urn';
      const spy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(null);
      const transformerSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      const result = await Resource.get(urn);
      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);

      expect(transformerSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('create', () => {
    test('should add connection', async () => {
      const data = {
        name: 'test',
        credentials: {
          host: 'test'
        },
        type: <SupportedDBType>'postgres'
      };
      const urn = 'test-urn';
      const connection = new Connection({ urn });
      const transformerCreateSpy = jest
        .spyOn(Transformer, 'create')
        .mockResolvedValueOnce({
          ...data,
          urn,
          credentials: 'test-credentials'
        });

      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({
          ...data,
          urn
        });

      const connectionSpy = jest
        .spyOn(Connection, 'create')
        // @ts-ignore
        .mockResolvedValue(connection);
      const result = await Resource.create(data);

      expect(result.urn).toBe(urn);

      expect(transformerCreateSpy).toHaveBeenCalledWith(data);
      expect(transformerCreateSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledWith(connection.toJSON());
      expect(transformerGetSpy).toHaveBeenCalledTimes(1);

      expect(connectionSpy).toHaveBeenCalledWith({
        ...data,
        urn,
        credentials: 'test-credentials'
      });
      expect(connectionSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    test('should return null if connection not found', async () => {
      const urn = 'test-urn';
      const data = {
        name: 'test',
        credentials: {
          host: 'test'
        },
        type: <SupportedDBType>'postgres'
      };
      const connectionSpy = jest
        .spyOn(Connection, 'updateByUrn')
        .mockResolvedValueOnce(null);

      const transformerUpdateSpy = jest
        .spyOn(Transformer, 'update')
        .mockResolvedValueOnce({
          ...data,
          credentials: 'test-credentials'
        });
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      const result = await Resource.update(urn, data);
      expect(result).toBeNull();
      expect(connectionSpy).toHaveBeenCalledWith(urn, {
        ...data,
        credentials: 'test-credentials'
      });
      expect(connectionSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledTimes(0);

      expect(transformerUpdateSpy).toHaveBeenCalledWith(data);
      expect(transformerUpdateSpy).toHaveBeenCalledTimes(1);
    });

    test('should update the connection', async () => {
      const urn = 'test-urn';
      const data = {
        name: 'test',
        credentials: {
          host: 'test'
        },
        type: <SupportedDBType>'postgres'
      };
      const connection = new Connection({ ...data, urn });

      const connectionSpy = jest
        .spyOn(Connection, 'updateByUrn')
        .mockResolvedValueOnce(connection);

      const transformerUpdateSpy = jest
        .spyOn(Transformer, 'update')
        .mockResolvedValueOnce({
          ...data,
          credentials: 'test-credentials'
        });
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce(connection);

      const result = await Resource.update(urn, data);
      expect(result?.urn).toBe(urn);
      expect(connectionSpy).toHaveBeenCalledWith(urn, {
        ...data,
        credentials: 'test-credentials'
      });
      expect(connectionSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledTimes(1);
      expect(transformerGetSpy).toHaveBeenCalledWith(connection);

      expect(transformerUpdateSpy).toHaveBeenCalledWith(data);
      expect(transformerUpdateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('testConnection', () => {
    test('should return null if connection not found', async () => {
      const urn = 'test-urn';
      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(null);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      const result = await Resource.testConnection(urn);
      expect(result).toBeNull();

      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledTimes(0);
    });

    test('should return the test result', async () => {
      const urn = 'test-urn';
      const connection = new Connection({ urn });

      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(connection);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      ConnectionProvider.prototype.test = jest
        .fn()
        .mockResolvedValueOnce('success');

      const result = await Resource.testConnection(urn);
      expect(result).toBe('success');

      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledTimes(1);

      expect(ConnectionProvider.prototype.test).toHaveBeenCalledTimes(1);
      expect(
        ConnectionProvider.prototype.test
      ).toHaveBeenCalledWith(/* empty */);
    });
  });

  describe('listTables', () => {
    test('should return null if connection not found', async () => {
      const urn = 'test-urn';
      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(null);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      const result = await Resource.listTables(urn);
      expect(result).toBeNull();

      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledTimes(0);
    });

    test('should return the table list', async () => {
      const urn = 'test-urn';
      const connection = new Connection({ urn });

      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(connection);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      ConnectionProvider.prototype.getTablesList = jest
        .fn()
        .mockResolvedValueOnce(['table-1', 'table-2']);

      const result = await Resource.listTables(urn);
      expect(result).toEqual(['table-1', 'table-2']);
      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);
      expect(transformerGetSpy).toHaveBeenCalledTimes(1);
      expect(ConnectionProvider.prototype.getTablesList).toHaveBeenCalledTimes(
        1
      );
      expect(
        ConnectionProvider.prototype.getTablesList
      ).toHaveBeenCalledWith(/* empty */);
    });
  });

  describe('getTable', () => {
    test('should return null if connection not found', async () => {
      const urn = 'test-urn';
      const tableName = 'table1';
      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(null);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      const result = await Resource.getTable(urn, tableName);
      expect(result).toBeNull();

      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledTimes(0);
    });

    test('should return the table details', async () => {
      const urn = 'test-urn';
      const tableName = 'table1';
      const connection = new Connection({ urn });

      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(connection);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      ConnectionProvider.prototype.getTablesDetails = jest
        .fn()
        .mockResolvedValueOnce([
          {
            name: 'order_no',
            type: 'STRING',
            mode: 'NULLABLE'
          },
          {
            name: 'booking_time',
            type: 'TIMESTAMP',
            mode: 'NULLABLE'
          }
        ]);

      const result = await Resource.getTable(urn, tableName);
      expect(result).toEqual([
        {
          name: 'order_no',
          type: 'STRING',
          mode: 'NULLABLE'
        },
        {
          name: 'booking_time',
          type: 'TIMESTAMP',
          mode: 'NULLABLE'
        }
      ]);
      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);
      expect(transformerGetSpy).toHaveBeenCalledTimes(1);
      expect(
        ConnectionProvider.prototype.getTablesDetails
      ).toHaveBeenCalledTimes(1);
      expect(
        ConnectionProvider.prototype.getTablesDetails
      ).toHaveBeenCalledWith(tableName);
    });
  });

  describe('getTableCube', () => {
    test('should return null if connection not found', async () => {
      const urn = 'test-urn';
      const tableName = 'table1';
      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(null);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        // @ts-ignore
        .mockResolvedValueOnce({});

      const result = await Resource.getTable(urn, tableName);
      expect(result).toBeNull();

      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);

      expect(transformerGetSpy).toHaveBeenCalledTimes(0);
    });

    test('should return the table cube schema', async () => {
      const urn = 'test-urn';
      const tableName = 'table1';
      const dbType = 'biqquery';
      const connection = new Connection({ urn, type: dbType });
      const connectionSpy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(connection);
      const transformerGetSpy = jest
        .spyOn(Transformer, 'get')
        .mockResolvedValueOnce({
          ...connection.toJSON(),
          credentials: {}
        });

      ConnectionProvider.prototype.getTableCube = jest
        .fn()
        .mockResolvedValueOnce('table cube schema');

      const result = await Resource.getTableCube(urn, tableName);
      expect(result).toBe('table cube schema');
      expect(connectionSpy).toHaveBeenCalledWith(urn);
      expect(connectionSpy).toHaveBeenCalledTimes(1);
      expect(transformerGetSpy).toHaveBeenCalledTimes(1);
      expect(ConnectionProvider.prototype.getTableCube).toHaveBeenCalledTimes(
        1
      );
      expect(ConnectionProvider.prototype.getTableCube).toHaveBeenCalledWith(
        tableName,
        'biqquery::test-urn'
      );
    });
  });
});
