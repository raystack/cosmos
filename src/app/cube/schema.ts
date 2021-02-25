import * as Joi from 'joi';

export const createPayload = Joi.object()
  .keys({
    connectionUrn: Joi.string().required(),
    tableName: Joi.string().required(),
    content: Joi.string().required()
  })
  .options({
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  });
