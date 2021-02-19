import * as Joi from 'joi';

const connectionResponse = Joi.object({
  urn: Joi.string(),
  name: Joi.string(),
  type: Joi.string(),
  credentials: Joi.string()
}).unknown(true);

export const listResponse = Joi.object({
  connections: Joi.array().items(connectionResponse)
});

export const createPayload = Joi.object().keys({
  name: Joi.string(),
  type: Joi.string(),
  credentials: Joi.string()
});

export const createResponse = Joi.object({
  connection: connectionResponse
});
