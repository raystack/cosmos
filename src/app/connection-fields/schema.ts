import * as Joi from 'joi';
import { SupportedDBs } from 'src/config/constants';

export const getFieldsResponse = Joi.object({
  data: Joi.array().items(
    Joi.object({
      name: Joi.string().valid(...SupportedDBs),
      fields: Joi.array().items(
        Joi.object({
          name: Joi.string(),
          type: Joi.string(),
          description: Joi.string()
        })
      )
    })
  )
});
