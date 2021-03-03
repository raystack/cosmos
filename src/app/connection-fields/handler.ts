import Hapi from '@hapi/hapi';
import * as Schema from './schema';
import * as Resource from './resource';

export const list = {
  description: 'Get Connection fields',
  tags: ['api'],
  response: {
    status: {
      200: Schema.getFieldsResponse
    }
  },
  handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const fields = await Resource.getFields();
    return { data: fields };
  }
};
