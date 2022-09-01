import Hapi, { ServerInjectOptions } from '@hapi/hapi';
import { plugin } from 'src/app/metric';
import * as Resource from 'src/app/metric/meta/resource';
import * as Config from 'src/config/config';
import Qs from 'qs';
import * as Boom from '@hapi/boom';

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
    query: {
      parser: (query) => Qs.parse(query, { comma: true, allowDots: true })
    },
    debug: false
  });
  await server.register(plugins, { routes: { prefix: '/api/metrics' } });
});

afterAll(async () => {
  await server.stop();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Metric/Meta::Handler', () => {
  describe('list', () => {
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: '/api/metrics/testMetric/meta'
      };
    });

    test('return meta object', async () => {
      const meta: Record<string, string> = { meta1: 'value1', meta2: 'value2' };
      const spy = jest.spyOn(Resource, 'list').mockResolvedValueOnce(meta);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(spy).toHaveBeenCalledWith('testMetric');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('return 404 if metric not found', async () => {
      const spy = jest
        .spyOn(Resource, 'list')
        .mockRejectedValue(Boom.notFound());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(spy).toHaveBeenCalledWith('testMetric');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('get', () => {
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: '/api/metrics/testMetric/meta/meta1'
      };
    });

    test('return meta object', async () => {
      const spy = jest
        .spyOn(Resource, 'get')
        .mockResolvedValueOnce({ meta1: 'value1' });
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(spy).toHaveBeenCalledWith('testMetric', 'meta1');
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('return 404 if metric not found', async () => {
      const spy = jest
        .spyOn(Resource, 'get')
        .mockRejectedValue(Boom.notFound());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(spy).toHaveBeenCalledWith('testMetric', 'meta1');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'POST',
        url: `/api/metrics/${urn}/meta`
      };
    });
    test('should create metric meta', async () => {
      const payload = { foo: 'bar', foo2: 'bar2' };
      request.payload = payload;
      const spy = jest.spyOn(Resource, 'create').mockResolvedValueOnce(payload);
      const expectedResult = {
        data: payload
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(urn, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should throw 400 error if payload is not valid', async () => {
      request.payload = { abc: 1234 };
      const spy = jest.spyOn(Resource, 'create').mockResolvedValueOnce({});
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(400);
      expect(response.result.error).toBe('Bad Request');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should throw 500 error if create fails', async () => {
      const payload = { foo: 'bar', foo2: 'bar2' };
      request.payload = payload;
      const spy = jest
        .spyOn(Resource, 'create')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(urn, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    const urn = 'test-urn';
    const metaName = 'meta1';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'PUT',
        url: `/api/metrics/${urn}/meta/${metaName}`
      };
    });

    test('return 404 if metric not found', async () => {
      request.payload = { value: 'abc' };
      const spy = jest
        .spyOn(Resource, 'update')
        .mockRejectedValue(Boom.notFound());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(spy).toHaveBeenCalledWith(urn, metaName, { value: 'abc' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should throw 400 error if payload is not valid', async () => {
      request.payload = { value: 1234 };
      const spy = jest.spyOn(Resource, 'update').mockResolvedValueOnce({});
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(400);
      expect(response.result.error).toBe('Bad Request');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should throw 500 error if update fails', async () => {
      request.payload = { value: 'abc' };
      const spy = jest
        .spyOn(Resource, 'update')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(urn, metaName, { value: 'abc' });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should update metric meta', async () => {
      request.payload = { value: 'abc' };
      const spy = jest
        .spyOn(Resource, 'update')
        .mockResolvedValueOnce({ value: 'abc', value1: 'abc', value2: 'def' });
      const expectedResult = {
        data: { value: 'abc', value1: 'abc', value2: 'def' }
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(urn, metaName, { value: 'abc' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteMeta', () => {
    const urn = 'test-urn';
    const metaName = 'meta1';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'DELETE',
        url: `/api/metrics/${urn}/meta/${metaName}`
      };
    });

    test('return 404 if metric not found', async () => {
      request.payload = { value: 'abc' };
      const spy = jest
        .spyOn(Resource, 'deleteMeta')
        .mockRejectedValue(Boom.notFound());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(spy).toHaveBeenCalledWith(urn, metaName);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should delete metric meta', async () => {
      const spy = jest
        .spyOn(Resource, 'deleteMeta')
        .mockResolvedValueOnce({ value: 'abc', value1: 'abc', value2: 'def' });
      const expectedResult = {
        data: { value: 'abc', value1: 'abc', value2: 'def' }
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(urn, metaName);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
