import * as Joi from 'joi';
import * as moment from 'moment';

const weekStartDate = (value, helpers) => {
  if (!moment(value).isValid()) {
    return helpers.error('any.invalid');
  }
  return moment(value).startOf('isoWeek');
};

export const scheduleValidations = {
  get: {
    params: Joi.object().keys({
      id: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
    }),
    query: Joi.object().keys({
      detailed: Joi.bool(),
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
      days: Joi.array()
        .items(
          Joi.object().keys({
            lessons: Joi.array().items(
              Joi.object().keys({
                subject: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
                bell: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
                teacher: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
                location: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
              }),
            ),
            day: Joi.number().min(1).max(7),
          }),
        )
        .required(),
      weekDate: Joi.date().custom(weekStartDate).required(),
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
      days: Joi.array()
        .items(
          Joi.object().keys({
            lessons: Joi.array().items(
              Joi.object().keys({
                subject: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
                bell: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
                teacher: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
                location: Joi.string()
                  .regex(/^[a-f\d]{24}$/i)
                  .required(),
              }),
            ),
            day: Joi.number().min(1).max(7),
          }),
        )
        .required(),
      weekDate: Joi.date().custom(weekStartDate),
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
