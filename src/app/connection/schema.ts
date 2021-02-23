import * as Joi from 'joi';

const connectionResponse = Joi.object({
  urn: Joi.string(),
  name: Joi.string(),
  type: Joi.string(),
  credentials: Joi.object()
}).unknown(true);

export const listResponse = Joi.object({
  connections: Joi.array().items(connectionResponse)
});

export const getParams = Joi.object({
  urn: Joi.string().required()
});

export const createPayload = Joi.object()
  .keys({
    name: Joi.string(),
    type: Joi.string().required(),
    credentials: Joi.object().required()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const updatePayload = Joi.object()
  .keys({
    name: Joi.string(),
    type: Joi.string(),
    credentials: Joi.object()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const createResponse = Joi.object({
  connection: connectionResponse
});
