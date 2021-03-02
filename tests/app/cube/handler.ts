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
      expect(spy).toHaveBeenCalledWith({});
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
      expect(spy).toHaveBeenCalledWith({});
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns throw 400 error if query is not valid', async () => {
      request.url = '/cubes?connection=';
      const spy = jest.spyOn(Resource, 'list').mockResolvedValueOnce([]);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(400);
      expect(response.result.error).toBe('Bad Request');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should pass the valid query', async () => {
      const connection = 'test-connection';
      const cubes = Factory.Cube.data.buildList(2, { connection });
      request.url = `/cubes?connection=${connection}`;
      const expectedResult = {
        data: cubes
      };
      const spy = jest.spyOn(Resource, 'list').mockResolvedValueOnce(cubes);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith({ connection });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns error when list fails', async () => {
      const spy = jest
        .spyOn(Resource, 'list')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith({});
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'POST',
        url: `/cubes`
      };
    });
    test('should create cube', async () => {
      const payload = Factory.Cube.payload.build();
      request.payload = payload;
      const cube = Factory.Cube.data.build({ urn });
      const spy = jest.spyOn(Resource, 'create').mockResolvedValueOnce(cube);
      const expectedResult = {
        data: cube
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should throw 400 error if payload is not valid', async () => {
      request.payload = {};
      const cube = Factory.Cube.data.build({ urn });
      const spy = jest.spyOn(Resource, 'create').mockResolvedValueOnce(cube);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(400);
      expect(response.result.error).toBe('Bad Request');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should throw 500 error if create fails', async () => {
      const payload = Factory.Cube.payload.build();
      request.payload = payload;
      const spy = jest
        .spyOn(Resource, 'create')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should ignore the extra keys in payload', async () => {
      const payload = Factory.Cube.payload.build();
      request.payload = { ...payload, extra: 'extra payload' };
      const cube = Factory.Cube.data.build({ urn, ...payload });
      const spy = jest.spyOn(Resource, 'create').mockResolvedValueOnce(cube);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith({
        ...payload,
        extra: 'extra payload'
      });
      expect(spy).toHaveBeenCalledWith(payload);
    });
  });

  describe('get', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: `/cubes/${urn}`
      };
    });
    test('return cube by urn', async () => {
      const cube = Factory.Cube.data.build({ urn });
      const spy = jest.spyOn(Resource, 'get').mockResolvedValueOnce(cube);
      const expectedResult = {
        data: cube
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 404 when cube not found', async () => {
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
