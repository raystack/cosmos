import * as Joi from 'joi';

export const createPayload = Joi.object()
  .keys({
    connection: Joi.string().required(),
    tableId: Joi.string().required(),
    content: Joi.string().required()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const updatePayload = Joi.object()
  .keys({
    connection: Joi.string(),
    tableId: Joi.string(),
    content: Joi.string()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });

export const listQuery = Joi.object({
  connection: Joi.string()
}).options({
  abortEarly: false, // abort after the last validation error
  stripUnknown: true // remove unknown keys from the validated data
});

const cubeResponse = Joi.object({
  urn: Joi.string(),
  connection: Joi.string(),
  tableId: Joi.string(),
  content: Joi.string()
}).unknown(true);

export const listResponse = Joi.object({
  data: Joi.array().items(cubeResponse)
});

export const createResponse = Joi.object({
  data: cubeResponse
});

export const getParams = Joi.object({
  urn: Joi.string().required()
});
