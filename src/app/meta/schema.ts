import * as Joi from 'joi';

export const getCubesMetaResponse = Joi.object({
  data: Joi.object({
    total: Joi.number(),
    lastUpdatedAt: Joi.date()
  })
});
