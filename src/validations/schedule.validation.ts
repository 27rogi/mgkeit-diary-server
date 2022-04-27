import * as Joi from 'joi';

export const scheduleValidations = {
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
      lessons: Joi.array()
        .items(Joi.string().regex(/^[a-f\d]{24}$/i))
        .required(),
      weekDate: Joi.date().required(),
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
      lessons: Joi.array().items(Joi.string().regex(/^[a-f\d]{24}$/i)),
      weekDate: Joi.date(),
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
