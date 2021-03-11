import Hapi, { ServerInjectOptions } from '@hapi/hapi';
import { plugin } from 'src/app/metric';
import * as Resource from 'src/app/metric/resource';
import * as Factory from 'tests/factories';
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
  await server.register(plugins, { routes: { prefix: '/api/metrics' } });
});

afterAll(async () => {
  await server.stop();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Metric::Handler', () => {
  describe('create', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'POST',
        url: `/api/metrics`
      };
    });
    test('should create metric', async () => {
      const payload = Factory.Metric.payload.build();
      request.payload = payload;
      const metric = Factory.Metric.data.build({ urn });
      const spy = jest.spyOn(Resource, 'create').mockResolvedValueOnce(metric);
      const expectedResult = {
        data: metric
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should throw 400 error if payload is not valid', async () => {
      request.payload = {};
      const metric = Factory.Metric.data.build({ urn });
      const spy = jest.spyOn(Resource, 'create').mockResolvedValueOnce(metric);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(400);
      expect(response.result.error).toBe('Bad Request');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should throw 500 error if create fails', async () => {
      const payload = Factory.Metric.payload.build();
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
  });
});
