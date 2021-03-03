import Cube from 'src/models/cube';
import * as Resource from 'src/app/meta/resource';

afterEach(() => {
  jest.resetAllMocks();
});

describe('Meta::Resource', () => {
  describe('cubesStats', () => {
    test('should return undefined if there is no data', async () => {
      const spy = jest.spyOn(Cube, 'getStats').mockResolvedValueOnce([]);
      const result = await Resource.cubesStats();
      expect(result).toBeUndefined();
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return stats', async () => {
      const stats = {
        total: 1,
        lastUpdatedAt: new Date().toISOString()
      };
      const spy = jest.spyOn(Cube, 'getStats').mockResolvedValueOnce([stats]);
      const result = await Resource.cubesStats();
      expect(result).toEqual(stats);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
