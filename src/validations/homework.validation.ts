import * as Joi from 'joi';

export const homeworkValidations = {
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
  getByGroup: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
  },
  create: {
    body: Joi.object().keys({
      subject: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      mission: Joi.string().required(),
      material: Joi.string().required(),
      deadline: Joi.date().required(),
      teacher: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      group: Joi.string()
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
      subject: Joi.string().regex(/^[a-f\d]{24}$/i),
      mission: Joi.string(),
      material: Joi.string(),
      deadline: Joi.date(),
      teacher: Joi.string().regex(/^[a-f\d]{24}$/i),
      group: Joi.string().regex(/^[a-f\d]{24}$/i),
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
