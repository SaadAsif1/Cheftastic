const Joi = require('@hapi/joi');

exports.contactValidation = (contact) => {
  const schema = Joi.object({
    name: Joi.string().max(32).required(),
    email: Joi.string().max(32).lowercase().required(),
    message: Joi.string().min(7).required(),
  });

  return schema.validate(contact);
};
