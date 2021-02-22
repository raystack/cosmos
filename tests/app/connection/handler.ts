import Hapi, { ServerInjectOptions, Plugin } from '@hapi/hapi';
import * as ConnectionPlugin from 'src/app/connection';
import * as Resource from 'src/app/connection/resource';
import * as Factory from 'tests/factories';
import * as Config from 'src/config/config';

let server: Hapi.Server;

interface IPlugin {
  register: () => void | Promise<void>;
  pkg: string;
}

beforeAll(async () => {
  const plugins: Plugin<IPlugin>[] = [<IPlugin>ConnectionPlugin];
  server = new Hapi.Server({
    port: Config.get('/port/api'),
    debug: false
  });
  await server.register(plugins);
});

afterAll(async () => {
  await server.stop();
});

describe('Connection::Handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('list', () => {
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: '/connections'
      };
    });
    test('returns empty list if no connections in db', async () => {
      const spy = jest.spyOn(Resource, 'list').mockResolvedValueOnce([]);
      const expectedResult = {
        connections: []
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns connections list', async () => {
      const connections = Factory.Connection.data.buildList(2);
      const spy = jest
        .spyOn(Resource, 'list')
        .mockResolvedValueOnce(connections);
      const expectedResult = {
        connections
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
