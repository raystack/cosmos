import * as Joi from 'joi';
import { SupportedDBType } from 'src/types';

const supportedDBs: Array<SupportedDBType> = ['postgres'];

const connectionResponse = Joi.object({
  urn: Joi.string(),
  name: Joi.string(),
  type: Joi.string(),
  credentials: Joi.object()
}).unknown(true);

export const listResponse = Joi.object({
  data: Joi.array().items(connectionResponse)
});

export const getParams = Joi.object({
  urn: Joi.string().required()
});

export const getTableParams = Joi.object({
  urn: Joi.string().required(),
  table_name: Joi.string().required()
});

export const createPayload = Joi.object()
  .keys({
    name: Joi.string(),
    type: Joi.string()
      .required()
      .valid(...supportedDBs),
    credentials: Joi.object().required()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const updatePayload = Joi.object()
  .keys({
    name: Joi.string(),
    type: Joi.string().valid(...supportedDBs),
    credentials: Joi.object()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const createResponse = Joi.object({
  data: connectionResponse
});
