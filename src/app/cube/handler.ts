import Hapi from '@hapi/hapi';
import { ICreateCubePayload, ICubeListQuery } from 'src/types';
import * as Resource from './resource';
import * as Schema from './schema';

export const list = {
  description: 'List Cubes',
  tags: ['api'],
  validate: {
    query: Schema.listQuery
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
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const cube = await Resource.create(<ICreateCubePayload>req.payload);
    return { data: cube };
  }
};
