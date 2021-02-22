import Connection, { IConnectionDocument } from 'src/models/connection';
import * as Resource from 'src/app/connection/resource';

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
});