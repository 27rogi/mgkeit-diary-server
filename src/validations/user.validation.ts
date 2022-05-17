import * as Joi from 'joi';

export const userValidations = {
  get: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
  },
  getAll: {
    query: Joi.object().keys({
      sort: Joi.string(),
      limit: Joi.number().integer(),
      page: Joi.number().integer(),
    }),
  },
  create: {
    body: Joi.object().keys({
      fio: Joi.string().required(),
      group: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      birthday: Joi.date().required(),
      address: Joi.string().required(),
      role: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      password: Joi.string().required(),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
    body: Joi.object().keys({
      fio: Joi.string(),
      group: Joi.string().regex(/^[a-f\d]{24}$/i),
      birthday: Joi.date(),
      address: Joi.string(),
      role: Joi.string().regex(/^[a-f\d]{24}$/i),
      password: Joi.string(),
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
