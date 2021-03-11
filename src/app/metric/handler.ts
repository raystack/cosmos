import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { ICreateMetricPayload } from 'src/types';
import * as Resource from './resource';
import * as Schema from './schema';

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
