import Hapi, { ServerInjectOptions, Plugin } from '@hapi/hapi';
import * as CubePlugin from 'src/app/cube';
import * as Resource from 'src/app/cube/resource';
import * as Config from 'src/config/config';
import * as Factory from 'tests/factories';

let server: Hapi.Server;

interface IPlugin {
  register: () => void | Promise<void>;
  pkg: string;
}

interface IServerResponse extends Hapi.ServerInjectResponse {
  result: {
    error?: string;
  };
}

beforeAll(async () => {
  const plugins: Plugin<IPlugin>[] = [<IPlugin>CubePlugin];
  server = new Hapi.Server({
    port: Config.get('/port/api'),
    debug: false
  });
  await server.register(plugins);
});

afterAll(async () => {
  await server.stop();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Cube::Handler', () => {
  describe('list', () => {
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: '/cubes'
      };
    });

    test('returns empty list if no cubes in db', async () => {
      const spy = jest.spyOn(Resource, 'list').mockResolvedValueOnce([]);
      const expectedResult = {
        data: []
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns cubes list', async () => {
      const cubes = Factory.Cube.data.buildList(2);
      const spy = jest.spyOn(Resource, 'list').mockResolvedValueOnce(cubes);
      const expectedResult = {
        data: cubes
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns error when list fails', async () => {
      const spy = jest
        .spyOn(Resource, 'list')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
