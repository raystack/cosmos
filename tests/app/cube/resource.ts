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
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return cube list', async () => {
      const cubes = [new Cube({ urn: 1 }), new Cube({ urn: 2 })];
      const spy = jest.spyOn(Cube, 'list').mockResolvedValueOnce(cubes);
      const expectedResult: ICubeDocument[] = cubes;
      const result = await Resource.list();
      expect(result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    test('should add cube', async () => {
      const data = {
        name: 'test',
        content: 'cube content',
        connectionUrn: 'connection-urn',
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
});
