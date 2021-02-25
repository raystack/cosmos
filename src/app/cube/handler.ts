import Hapi from '@hapi/hapi';
import * as Resource from './resource';

export const list = {
  description: 'List Cubes',
  tags: ['api'],
  handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connections = await Resource.list();
    return { data: connections };
  }
};
