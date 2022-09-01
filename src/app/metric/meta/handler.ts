import Hapi from '@hapi/hapi';
import * as Resource from './resource';
import * as Schema from './schema';

export const list = {
  description: 'Get Metric meta fields',
  tags: ['api'],
  validate: {
    params: Schema.listParams
  },
  response: {
    status: {
      200: Schema.listResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const meta = await Resource.list(req.params.metricUrn);
    return { data: meta };
  }
};

export const get = {
  description: 'Get Metric field value',
  tags: ['api'],
  validate: {
    params: Schema.getParams
  },
  response: {
    status: {
      200: Schema.listResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const meta = await Resource.get(req.params.metricUrn, req.params.metaName);
    return { data: meta };
  }
};

export const create = {
  description: 'Create Metric meta fields',
  tags: ['api'],
  validate: {
    params: Schema.listParams,
    payload: Schema.createPayload
  },
  response: {
    status: {
      200: Schema.listResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const meta = await Resource.create(
      req.params.metricUrn,
      <Record<string, string>>req.payload
    );
    return { data: meta };
  }
};

export const update = {
  description: 'Update Metric meta fields',
  tags: ['api'],
  validate: {
    params: Schema.getParams,
    payload: Schema.updatePayload
  },
  response: {
    status: {
      200: Schema.listResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const meta = await Resource.update(
      req.params.metricUrn,
      req.params.metaName,
      <{ value: string }>req.payload
    );
    return { data: meta };
  }
};

export const deleteMeta = {
  description: 'Delete Metric meta field',
  tags: ['api'],
  validate: {
    params: Schema.getParams
  },
  response: {
    status: {
      200: Schema.listResponse
    }
  },
  handler: async (req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    const meta = await Resource.deleteMeta(
      req.params.metricUrn,
      req.params.metaName
    );
    return { data: meta };
  }
};
