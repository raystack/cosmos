import * as Joi from 'joi';

export const listResponse = Joi.object({
  data: Joi.object().pattern(Joi.string(), Joi.string())
});

export const listParams = Joi.object({
  metricUrn: Joi.string().required()
});

export const getParams = Joi.object({
  metricUrn: Joi.string().required(),
  metaName: Joi.string().required()
});

export const createPayload = Joi.object()
  .pattern(Joi.string(), Joi.string())
  .options({
    abortEarly: false,
    stripUnknown: true
  });

export const updatePayload = Joi.object({
  value: Joi.string().required()
}).options({
  abortEarly: false,
  stripUnknown: true
});
