import * as Joi from 'joi';

export const lessonValidations = {
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
      bell: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      teacher: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      location: Joi.string().required(),
      weekDay: Joi.number().min(1).max(7).required(),
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
      bell: Joi.string().regex(/^[a-f\d]{24}$/i),
      teacher: Joi.string().regex(/^[a-f\d]{24}$/i),
      location: Joi.string(),
      weekDay: Joi.number().min(1).max(7),
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
