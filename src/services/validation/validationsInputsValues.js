const { idSchema, addProductSchema, quantitySchema } = require('./schema');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };
  return { type: null, message: '' };
};

const validateNameProduct = (name) => {
  const { error } = addProductSchema.validate({ name });
  if (error) {
  return {
      type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long',
    }; 
  }
  return { type: null, message: '' };
}; 

const validateQuantity = (salesProduct) => { 
  const { error } = quantitySchema.validate(salesProduct);
  if (error) {
    return {
      type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNameProduct,
  validateQuantity,
};