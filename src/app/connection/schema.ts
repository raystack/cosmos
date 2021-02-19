import * as Joi from 'joi';

export const listResponse = Joi.object().keys({
  connections: Joi.array().items(
    Joi.object().keys({
      urn: Joi.string(),
      name: Joi.string(),
      type: Joi.string(),
      credentials: Joi.string()
    })
  )
});
