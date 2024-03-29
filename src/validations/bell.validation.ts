import * as Joi from 'joi';
import * as moment from 'moment';

const checkTime = (value, helpers) => {
  if (!moment(value, 'HH:mm', true).isValid()) {
    return helpers.error('any.invalid');
  }
  return moment(value, 'HH:mm').format('HH:mm');
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
