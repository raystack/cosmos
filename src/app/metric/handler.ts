import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { ICreateMetricPayload, IUpdateMetricPayload } from 'src/types';
import * as Resource from './resource';
import * as Schema from './schema';

export const list = {
  description: 'Get Metric list',
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
    const metrics = await Resource.list(req.query);
    return { data: metrics };
  }
};

export const create = {
  description: 'Create Metric',
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
    const metric = await Resource.create(<ICreateMetricPayload>req.payload);
    return { data: metric };
  }
};

export const get = {
  description: 'Get Metric by urn',
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
    const metric = await Resource.get(req.params.urn);
    if (!metric) {
      throw Boom.notFound(`Metric not found for urn: ${req.params.urn}`);
    }
    return { data: metric };
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
    const metric = await Resource.update(
      req.params.urn,
      <IUpdateMetricPayload>req.payload
    );
    if (!metric) {
      throw Boom.notFound(`Metric not found for urn: ${req.params.urn}`);
    }
    return { data: metric };
  }
};
