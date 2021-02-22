import Connection, { IConnectionDocument } from 'src/models/connection';
import * as Resource from 'src/app/connection/resource';
import * as Transformer from 'src/app/connection/transformer';

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
      const urn = 'test-urn';
      const spy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(new Connection());
      await Resource.get(urn);
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return null if connection not found', async () => {
      const urn = 'test-urn';
      const spy = jest
        .spyOn(Connection, 'findByUrn')
        .mockResolvedValueOnce(null);
      const result = await Resource.get(urn);
      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    test('should add connection', async () => {
      const data = {
        name: 'test',
        credentials: 'test',
        type: 'bq'
      };
      const urn = 'test-urn';
      const transformerSpy = jest
        .spyOn(Transformer, 'create')
        .mockResolvedValueOnce({ urn, ...data });
      const connectionSpy = jest
        .spyOn(Connection, 'create')
        // @ts-ignore
        .mockResolvedValue(new Connection({ urn }));
      const result = await Resource.create(data);

      expect(result.urn).toBe(urn);

      expect(transformerSpy).toHaveBeenCalledWith(data);
      expect(transformerSpy).toHaveBeenCalledTimes(1);

      expect(connectionSpy).toHaveBeenCalledWith({ ...data, urn });
      expect(connectionSpy).toHaveBeenCalledTimes(1);
    });
  });
});
