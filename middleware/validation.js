//------------------------- START OF MY CODE -------------------------//
// import the validation library
const Joi = require("joi");

module.exports = {
  /**
   * @desc validate the blog information
   * @returns the next middleware function
   * @throws a validation error
   */
  blogSchema: (req, res, next) => {
    // define the validation schema
    // title, author, subtitle are all strings with a word limit and are all required
    const schema = Joi.object({
      title: Joi.string().max(80).required(),
      author: Joi.string().max(80).required(),
      subtitle: Joi.string().max(280).required(),
    });

    // validate the request body against the schema
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
    }
    req.body = value;
    next();
  },

  /**
   * @desc validate the article
   * @returns the next middleware function
   * @throws a validation error
   */
  articleSchema: (req, res, next) => {
    // define the validation schema
    // title, subtitle, content are all strings with a word limit
    // title and content are required, subtitle is optional
    const schema = Joi.object({
      title: Joi.string().max(80).required(),
      subtitle: Joi.string().max(280).allow(""),
      content: Joi.string().max(10000).required(),
    });

    // validate the request body against the schema
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      next(`Validation error: ${error.details.map((x) => x.message).join(", ")}`);
    }
    req.body = value;
    next();
  },

  /**
   * @desc validate the password
   * @returns the next middleware function
   * @throws a validation error
   */
  passwordSchema: (req, res, next) => {
    // define the validation schema
    const schema = Joi.object({
      password: Joi.string().alphanum().min(4).max(255).required(),
    });

    // validate the request body against the schema
    const { error, value } = schema.validate(req.body);
    if (error) {
      next(`Validation error: ${error.message}`);
    }
    req.body = value;
    next();
  },
};

//------------------------- END OF MY CODE -------------------------//
