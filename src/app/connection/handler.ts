import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import * as Schema from './schema';
import * as Resource from './resource';

export const list = {
  description: 'List Connections',
  tags: ['api'],
  response: {
    status: {
      200: Schema.listResponse
    }
  },
  handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connections = await Resource.list();
    return { connections };
  }
};

export const create = {
  description: 'Create Connection',
  tags: ['api'],
  validate: {
    payload: Schema.createPayload
  },
  response: {
    status: {
      200: Schema.createResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connection = await Resource.create(
      <Resource.CreatePayload>req.payload
    );
    return { connection };
  }
};

export const get = {
  description: 'Get Connection by urn',
  tags: ['api'],
  response: {
    status: {
      200: Schema.createResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connection = await Resource.get(req.params.urn);
    if (!connection) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { connection };
  }
};
