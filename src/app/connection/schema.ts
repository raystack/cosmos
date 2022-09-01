import * as Joi from 'joi';
import { SupportedDBs } from 'src/config/constants';

const suppotedTypeValidation = Joi.string()
  .valid(...SupportedDBs)
  .messages({
    'any.required': `"type" is a required field`,
    'any.only': `"{#value}" is not supported database`
  });

const connectionResponse = Joi.object({
  urn: Joi.string(),
  name: Joi.string(),
  type: Joi.string(),
  credentials: Joi.object()
}).unknown(true);

export const listResponse = Joi.object({
  data: Joi.array().items(connectionResponse)
});

export const listTableResponse = Joi.object({
  data: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      id: Joi.string()
    })
  )
});

export const getTableCubeResponse = Joi.object({
  data: Joi.string()
});

export const testResponse = Joi.object({
  data: Joi.string().valid('Success', 'Failure')
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
    name: Joi.string().required(),
    type: suppotedTypeValidation.required(),
    credentials: Joi.object().required()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const updatePayload = Joi.object()
  .keys({
    name: Joi.string(),
    type: suppotedTypeValidation,
    credentials: Joi.object()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const createResponse = Joi.object({
  data: connectionResponse
});
