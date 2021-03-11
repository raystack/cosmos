import Hapi from '@hapi/hapi';
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
