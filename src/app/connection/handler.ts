import Hapi from '@hapi/hapi';
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
  handler: (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    return Resource.list().then((connections) => {
      return { connections };
    });
  }
};
