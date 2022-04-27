import * as Joi from 'joi';

export const replacementValidations = {
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
      lesson: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      schedule: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      teacher: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      location: Joi.string().required(),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
    body: Joi.object().keys({
      lesson: Joi.string().regex(/^[a-f\d]{24}$/i),
      schedule: Joi.string().regex(/^[a-f\d]{24}$/i),
      teacher: Joi.string().regex(/^[a-f\d]{24}$/i),
      location: Joi.string(),
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
