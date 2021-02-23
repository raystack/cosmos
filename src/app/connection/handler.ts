import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { ICreateConnectionPayload } from 'src/types';
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
      <ICreateConnectionPayload>req.payload
    );
    return { connection };
  }
};

export const get = {
  description: 'Get Connection by urn',
  tags: ['api'],
  validate: {
    params: Schema.getParams
  },
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

export const update = {
  description: 'Update Connection by urn',
  tags: ['api'],
  validate: {
    payload: Schema.updatePayload,
    params: Schema.getParams
  },
  response: {
    status: {
      200: Schema.createResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connection = await Resource.update(
      req.params.urn,
      <ICreateConnectionPayload>req.payload
    );
    if (!connection) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { connection };
  }
};

export const getFields = {
  description: 'Get Connection fields',
  tags: ['api'],
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const data = await Resource.getFields();
    return { data };
  }
};
