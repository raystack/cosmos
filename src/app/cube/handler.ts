import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { ICreateCubePayload, ICubeListQuery } from 'src/types';
import * as Resource from './resource';
import * as Schema from './schema';

export const list = {
  description: 'List Cubes',
  tags: ['api'],
  validate: {
    query: Schema.listQuery
  },
  response: {
    status: {
      200: Schema.listResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connections = await Resource.list(<ICubeListQuery>req.query);
    return { data: connections };
  }
};

export const create = {
  description: 'Create Cube',
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
    const cube = await Resource.create(<ICreateCubePayload>req.payload);
    return { data: cube };
  }
};

export const get = {
  description: 'Get Cube by urn',
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
    const cube = await Resource.get(req.params.urn);
    if (!cube) {
      throw Boom.notFound(`Cube not found for urn: ${req.params.urn}`);
    }
    return { data: cube };
  }
};
