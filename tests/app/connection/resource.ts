import Connection from 'src/models/connection';
import * as Resource from 'src/app/connection/resource';
import * as Transformer from 'src/app/connection/transformer';
import { IConnectionDocument, SupportedDBType } from 'src/types';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Connection::Resource', () => {
  describe('list', () => {
    test('should return empty list', async () => {
      const spy = jest.spyOn(Connection, 'list').mockResolvedValueOnce([]);
      const expectedResult: IConnectionDocument[] = [];
      const result = await Resource.list();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith();
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
      const connection = new Connection(data);

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
        .mockResolvedValueOnce({ ...data, urn });

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
});
