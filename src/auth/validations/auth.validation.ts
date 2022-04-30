import * as Joi from 'joi';

export const authValidations = {
  login: {
    body: Joi.object().keys({
      fio: Joi.string().required(),
      group: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      password: Joi.string().required(),
    }),
  },
  register: {
    body: Joi.object().keys({
      fio: Joi.string().required(),
      group: Joi.string()
        .regex(/^[a-f\d]{24}$/i)
        .required(),
      birthday: Joi.date().required(),
      address: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  refresh: {
    body: Joi.object().keys({
      refresh_token: Joi.string().required(),
    }),
  },
};
