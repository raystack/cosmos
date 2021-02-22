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

interface IServerResponse extends Hapi.ServerInjectResponse {
  result: {
    error?: string;
  };
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

afterEach(() => {
  jest.resetAllMocks();
});

describe('Connection::Handler', () => {
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

    test('returns error when list fails', async () => {
      const spy = jest
        .spyOn(Resource, 'list')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: `/connections/${urn}`
      };
    });
    test('return connection by urn', async () => {
      const connection = Factory.Connection.data.build({ urn });
      const spy = jest.spyOn(Resource, 'get').mockResolvedValueOnce(connection);
      const expectedResult = {
        connection
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 404 when connection not found', async () => {
      const spy = jest.spyOn(Resource, 'get').mockResolvedValueOnce(null);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(response.result.error).toBe('Not Found');
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 500 when get call throws error', async () => {
      const spy = jest
        .spyOn(Resource, 'get')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
