const Joi = require('@hapi/joi');

exports.postValidation = (post) => {
  const schema = Joi.object({
    title: Joi.string().min(4).max(25).required(),
    postText: Joi.string().required(),
  });

  return schema.validate(post);
};

exports.commentValidation = (comment) => {
  const schema = Joi.object({
    commentText: Joi.string().required(),
  });

  return schema.validate(comment);
};
