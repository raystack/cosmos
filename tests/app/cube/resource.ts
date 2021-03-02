import Cube from 'src/models/cube';
import * as Resource from 'src/app/cube/resource';
import * as Transformer from 'src/app/cube/transformer';

import { ICubeDocument } from 'src/types';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Cube::Resource', () => {
  describe('list', () => {
    test('should return empty list', async () => {
      const spy = jest.spyOn(Cube, 'list').mockResolvedValueOnce([]);
      const expectedResult: ICubeDocument[] = [];
      const result = await Resource.list();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith({});
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return cube list', async () => {
      const cubes = [new Cube({ urn: 1 }), new Cube({ urn: 2 })];
      const spy = jest.spyOn(Cube, 'list').mockResolvedValueOnce(cubes);
      const expectedResult: ICubeDocument[] = cubes;
      const result = await Resource.list();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith({});
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return cube list based on the query', async () => {
      const cubes = [
        new Cube({ urn: 1, connection: 'test-connection' }),
        new Cube({ urn: 2, connection: 'test-connection' })
      ];
      const spy = jest.spyOn(Cube, 'list').mockResolvedValueOnce(cubes);
      const expectedResult: ICubeDocument[] = cubes;
      const result = await Resource.list({
        connection: 'test-connection'
      });
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith({ connection: 'test-connection' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    test('should add cube', async () => {
      const data = {
        name: 'test',
        content: 'cube content',
        connection: 'connection-urn',
        tableName: 'table1'
      };
      const urn = 'test-urn';
      const cube = new Cube({ urn });
      const transformerCreateSpy = jest
        .spyOn(Transformer, 'create')
        .mockResolvedValueOnce({
          ...data,
          urn
        });
      // @ts-ignore
      const cubeSpy = jest.spyOn(Cube, 'create').mockResolvedValue(cube);
      const result = await Resource.create(data);

      expect(result.urn).toBe(urn);

      expect(transformerCreateSpy).toHaveBeenCalledWith(data);
      expect(transformerCreateSpy).toHaveBeenCalledTimes(1);

      expect(cubeSpy).toHaveBeenCalledWith({
        ...data,
        urn
      });
      expect(cubeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    test('should pass urn to findByUrn', async () => {
      const cube = new Cube();
      const urn = 'test-urn';
      const spy = jest.spyOn(Cube, 'findByUrn').mockResolvedValueOnce(cube);
      await Resource.get(urn);
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return null if cube not found', async () => {
      const urn = 'test-urn';
      const spy = jest.spyOn(Cube, 'findByUrn').mockResolvedValueOnce(null);
      const result = await Resource.get(urn);
      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
