import Hapi, { ServerInjectOptions } from '@hapi/hapi';
import * as HealthPlugin from 'src/app/health';
import * as Config from 'src/config/config';

let server: Hapi.Server;

beforeAll(async () => {
  const plugins: any = [HealthPlugin];
  server = new Hapi.Server({
    port: Config.get('/port/api'),
    debug: false
  });
  await server.register(plugins);
});

afterAll(async () => {
  await server.stop();
});

describe('HealthCheck::Handler::ping', () => {
  let request: ServerInjectOptions;
  beforeEach(() => {
    request = {
      method: 'GET',
      url: '/ping'
    };
  });
  test('returns :ok status', async () => {
    const expectedResult = {
      statusCode: 200,
      status: 'ok',
      message: 'pong'
    };

    const response = await server.inject(request);
    expect(response.statusCode).toBe(200);
    expect(response.result).toEqual(expectedResult);
  });
});
