const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const quantitySchema = Joi.array().items(
  Joi.object().keys({
    productId: Joi.number().integer().min(1),
    quantity: Joi.number().integer().min(1),
  }),
);

module.exports = {
  idSchema,
  addProductSchema,
  quantitySchema,
};
