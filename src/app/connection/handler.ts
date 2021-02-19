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
  handler: (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    return Resource.create(<Resource.CreatePayload>req.payload).then(
      (connection) => {
        return { connection };
      }
    );
  }
};
