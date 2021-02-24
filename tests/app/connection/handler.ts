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
        data: []
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(/* empty */);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns connections list', async () => {
      const connections = Factory.Connection.data.buildList(2);
      const spy = jest
        .spyOn(Resource, 'list')
        .mockResolvedValueOnce(connections);
      const expectedResult = {
        data: connections
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
        data: connection
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

  describe('create', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'POST',
        url: `/connections`
      };
    });
    test('should create connection', async () => {
      const payload = Factory.Connection.payload.build();
      request.payload = payload;
      const connection = Factory.Connection.data.build({ urn });
      const spy = jest
        .spyOn(Resource, 'create')
        .mockResolvedValueOnce(connection);
      const expectedResult = {
        data: connection
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should throw 400 error if payload is not valid', async () => {
      request.payload = {};
      const connection = Factory.Connection.data.build({ urn });
      const spy = jest
        .spyOn(Resource, 'create')
        .mockResolvedValueOnce(connection);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(400);
      expect(response.result.error).toBe('Bad Request');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should throw 500 error if create fails', async () => {
      const payload = Factory.Connection.payload.build();
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
      const payload = Factory.Connection.payload.build();
      request.payload = { ...payload, extra: 'extra payload' };
      const connection = Factory.Connection.data.build({ urn, ...payload });
      const spy = jest
        .spyOn(Resource, 'create')
        .mockResolvedValueOnce(connection);
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

  describe('update', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'PUT',
        url: `/connections/${urn}`
      };
    });
    test('return connection by urn', async () => {
      const payload = Factory.Connection.payload.build();
      request.payload = payload;
      const connection = Factory.Connection.data.build({ urn, ...payload });
      const spy = jest
        .spyOn(Resource, 'update')
        .mockResolvedValueOnce(connection);
      const expectedResult = {
        data: connection
      };
      const response = await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledWith(urn, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 404 when connection not found', async () => {
      const payload = Factory.Connection.payload.build();
      request.payload = payload;
      const spy = jest.spyOn(Resource, 'update').mockResolvedValueOnce(null);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(response.result.error).toBe('Not Found');
      expect(spy).toHaveBeenCalledWith(urn, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 500 when update call throws error', async () => {
      const payload = Factory.Connection.payload.build();
      request.payload = payload;
      const spy = jest
        .spyOn(Resource, 'update')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(urn, payload);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 400 if payload is not valid', async () => {
      const payload = Factory.Connection.payload.build({ type: 1234 });
      const connection = Factory.Connection.data.build({ urn, ...payload });
      request.payload = payload;
      const spy = jest
        .spyOn(Resource, 'update')
        .mockResolvedValueOnce(connection);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(400);
      expect(response.result.error).toBe('Bad Request');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    test('should ignore the extra keys in payload', async () => {
      const payload = Factory.Connection.payload.build();
      const connection = Factory.Connection.data.build({ urn, ...payload });
      request.payload = { ...payload, extra: 'extra payload' };
      const spy = jest
        .spyOn(Resource, 'update')
        .mockResolvedValueOnce(connection);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).not.toHaveBeenCalledWith(urn, {
        ...payload,
        extra: 'extra payload'
      });
      expect(spy).toHaveBeenCalledWith(urn, payload);
    });
  });

  describe('testConnection', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: `/connections/${urn}/test`
      };
    });

    test('returns 404 when connection not found', async () => {
      const spy = jest
        .spyOn(Resource, 'testConnection')
        .mockResolvedValueOnce(null);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(response.result.error).toBe('Not Found');
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 500 when update call throws error', async () => {
      const spy = jest
        .spyOn(Resource, 'testConnection')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return the test result', async () => {
      const spy = jest
        .spyOn(Resource, 'testConnection')
        .mockResolvedValueOnce('Success');
      const expectedResult = {
        data: 'Success'
      };
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(urn);
    });
  });

  describe('listTables', () => {
    const urn = 'test-urn';
    let request: ServerInjectOptions;
    beforeEach(() => {
      request = {
        method: 'GET',
        url: `/connections/${urn}/tables`
      };
    });

    test('returns 404 when connection not found', async () => {
      const spy = jest
        .spyOn(Resource, 'listTables')
        .mockResolvedValueOnce(null);
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(404);
      expect(response.result.error).toBe('Not Found');
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('returns 500 when update call throws error', async () => {
      const spy = jest
        .spyOn(Resource, 'listTables')
        .mockRejectedValueOnce(new Error());
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(500);
      expect(response.result.error).toBe('Internal Server Error');
      expect(spy).toHaveBeenCalledWith(urn);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should return the tables list', async () => {
      const spy = jest.spyOn(Resource, 'listTables').mockResolvedValueOnce([
        { name: 'table-1', id: 'table-1' },
        { name: 'table-2', id: 'table-2' }
      ]);
      const expectedResult = {
        data: [
          { name: 'table-1', id: 'table-1' },
          { name: 'table-2', id: 'table-2' }
        ]
      };
      const response = <IServerResponse>await server.inject(request);
      expect(response.statusCode).toBe(200);
      expect(response.result).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(urn);
    });
  });
});
