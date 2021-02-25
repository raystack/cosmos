import Cube from 'src/models/cube';
import * as Resource from 'src/app/cube/resource';
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
      expect(result).toEqual(cubes);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
