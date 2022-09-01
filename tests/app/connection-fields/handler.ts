import Hapi, { ServerInjectOptions } from '@hapi/hapi';
import { plugin } from 'src/app/connection-fields';
import * as Resource from 'src/app/connection-fields/resource';
import * as Config from 'src/config/config';
import { SupportedDBType } from 'src/types';

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
  await server.register(plugins, {
    routes: { prefix: '/api/connection-fields' }
  });
});

afterAll(async () => {
  await server.stop();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Connection Fields::Handler', () => {
  describe('list', () => {
    const request: ServerInjectOptions = {
      method: 'GET',
      url: '/api/connection-fields'
    };

    test('returns fields list', async () => {
      const list = [
        { name: <SupportedDBType>'postgres', fields: [] },
        { name: <SupportedDBType>'bigquery', fields: [] }
      ];
      const spy = jest.spyOn(Resource, 'getFields').mockResolvedValueOnce(list);
      const expectedResult = {
        data: list
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
