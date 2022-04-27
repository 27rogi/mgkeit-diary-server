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
  create: {
    body: Joi.object().keys({
      subject: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      mission: Joi.string().required(),
      material: Joi.string().required(),
      dealine: Joi.date().required(),
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
      subject: Joi.string().regex(/^[a-f\d]{24}$/i),
      mission: Joi.string(),
      material: Joi.string(),
      dealine: Joi.date(),
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
