const { productsModel } = require('../models');
const schema = require('./validation/validationsInputsValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findByID(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (productName) => {
  const error = schema.validateNameProduct(productName);
  if (error.type) return error;

  const newIdProduct = await productsModel.insert(productName);
  const newProduct = await productsModel.findByID(newIdProduct);
  
  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
};