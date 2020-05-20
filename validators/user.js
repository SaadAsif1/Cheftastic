const Joi = require('@hapi/joi');

exports.updateAccountValidation = (update) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(6).max(20).required(),
  });

  return schema.validate(update);
};

exports.userProfileValidation = (update) => {
  const schema = Joi.object({
    thumbnail: Joi.string(),
    website: Joi.string(),
    bio: Joi.string().max(250),
  });

  return schema.validate(update);
};
