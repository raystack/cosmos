import Hapi, { ServerInjectOptions } from '@hapi/hapi';
import { plugin } from 'src/app/meta';
import * as Resource from 'src/app/meta/resource';
import * as Config from 'src/config/config';

let server: Hapi.Server;

interface IServerResponse extends Hapi.ServerInjectResponse {
  result: {
    error?: string;
  };
}

beforeAll(async () => {
  const plugins = [{ plugin }];
  server = new Hapi.Server({
    port: Config.get('/port/api'),
    debug: false
  });
  await server.register(plugins, { routes: { prefix: '/api/meta' } });
});

afterAll(async () => {
  await server.stop();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Meta::Handler', () => {
  describe('getCubesMetaData', () => {
    const request: ServerInjectOptions = {
      method: 'GET',
      url: '/api/meta/cubes'
    };

    test('returns cube stats', async () => {
      const cubeStats = {
        total: 1,
        lastUpdatedAt: new Date().toISOString()
      };
      const spy = jest
        .spyOn(Resource, 'cubesStats')
        .mockResolvedValueOnce(cubeStats);
      const expectedResult = {
        data: cubeStats
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns empty obj if stats data is undefined', async () => {
      const spy = jest
        .spyOn(Resource, 'cubesStats')
        .mockResolvedValueOnce(undefined);
      const expectedResult = {
        data: {}
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
