import Hapi from '@hapi/hapi';
import * as Schema from './schema';
import * as Resource from './resource';

export const getCubesMetaData = {
  description: 'Get Cubes Meta Info',
  tags: ['api'],
  response: {
    status: {
      200: Schema.getCubesMetaResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connections = await Resource.cubesStats();
    return { data: connections };
  }
};
