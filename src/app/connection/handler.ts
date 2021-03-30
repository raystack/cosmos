import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import { ICreateConnectionPayload } from 'src/types';
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
  handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connections = await Resource.list();
    return { data: connections };
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
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const connection = await Resource.create(
      <ICreateConnectionPayload>req.payload
    );
    return { data: connection };
  }
};

export const get = {
  description: 'Get Connection by urn',
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
    const connection = await Resource.get(req.params.urn);
    if (!connection) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { data: connection };
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
    const connection = await Resource.update(
      req.params.urn,
      <ICreateConnectionPayload>req.payload
    );
    if (!connection) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { data: connection };
  }
};

export const testConnection = {
  description: 'Test Connection',
  tags: ['api'],
  validate: {
    params: Schema.getParams
  },
  response: {
    status: {
      200: Schema.testResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const data = await Resource.testConnection(req.params.urn);
    if (!data) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { data };
  }
};

export const testCredentials = {
  description: 'Test Credentials',
  tags: ['api'],
  validate: {
    payload: Schema.createPayload
  },
  response: {
    status: {
      200: Schema.testResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const data = await Resource.testCredentials(
      <ICreateConnectionPayload>req.payload
    );
    return { data };
  }
};

export const listTables = {
  description: "Get Connection's tables list",
  tags: ['api'],
  validate: {
    params: Schema.getParams
  },
  response: {
    status: {
      200: Schema.listTableResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const data = await Resource.listTables(req.params.urn);
    if (!data) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { data };
  }
};

export const getTable = {
  description: 'Get table details',
  tags: ['api'],
  validate: {
    params: Schema.getTableParams
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const data = await Resource.getTable(req.params.urn, req.params.table_name);
    if (!data) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { data };
  }
};

export const getTableCube = {
  description: 'Get table cube schema',
  tags: ['api'],
  validate: {
    params: Schema.getTableParams
  },
  response: {
    status: {
      200: Schema.getTableCubeResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const cube = await Resource.getTableCube(
      req.params.urn,
      req.params.table_name
    );
    if (!cube) {
      throw Boom.notFound(`Connection not found for urn: ${req.params.urn}`);
    }
    return { data: cube };
  }
};
