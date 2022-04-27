import * as Joi from 'joi';

export const groupValidations = {
  get: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
  },
  getAll: {
    query: Joi.object().keys({
      sortBy: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  },
  create: {
    body: Joi.object().keys({
      name: Joi.string().required(),
      teachStartDate: Joi.date().required(),
      teacher: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
    body: Joi.object().keys({
      name: Joi.string(),
      teachStartDate: Joi.date(),
      teacher: Joi.string().regex(/^[a-f\d]{24}$/i),
    }),
  },
  delete: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
  },
};
