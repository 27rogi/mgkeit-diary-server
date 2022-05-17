import * as Joi from 'joi';

export const gradeValidations = {
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
      student: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      teacher: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      subject: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      reason: Joi.string().required(),
      weight: Joi.number().required(),
      grade: Joi.number().min(1).max(5).required(),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
    body: Joi.object().keys({
      student: Joi.string().regex(/^[a-f\d]{24}$/i),
      teacher: Joi.string().regex(/^[a-f\d]{24}$/i),
      subject: Joi.string().regex(/^[a-f\d]{24}$/i),
      reason: Joi.string(),
      weight: Joi.number(),
      grade: Joi.number().min(1).max(5),
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
