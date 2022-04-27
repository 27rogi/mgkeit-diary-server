import * as Joi from 'joi';
import moment from 'moment';

const checkTime = (value, helpers) => {
  if (moment(value, 'HH:mm').isValid()) return helpers.error('any.invalid');
  return value;
};

export const bellValidations = {
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
      startTime: Joi.string().custom(checkTime).required(),
      endTime: Joi.string().custom(checkTime).required(),
    }),
  },
  update: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
    body: Joi.object().keys({
      startTime: Joi.string().custom(checkTime),
      endTime: Joi.string().custom(checkTime),
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
