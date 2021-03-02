import * as Joi from 'joi';

export const createPayload = Joi.object()
  .keys({
    connection: Joi.string().required(),
    tableName: Joi.string().required(),
    content: Joi.string().required()
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
