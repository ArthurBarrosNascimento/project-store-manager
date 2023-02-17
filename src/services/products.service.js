const { productsModel } = require('../models');
const schema = require('./validation/validationsInputsValues');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = schema.validateId(productId);
  if (error.type) return error;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const createProduct = async (productName) => {
  const error = schema.validateNameProduct(productName);
  if (error.type) return error;

  const newIdProduct = await productsModel.insert(productName);
  const newProduct = await productsModel.findById(newIdProduct);
  
  return { type: null, message: newProduct };
};

const updateProduct = async (productId, name) => {
  const errorId = schema.validateId(productId);
  if (errorId.type) return errorId;
  const errorName = schema.validateNameProduct(name);
  if (errorName.type) return errorName;

  const product = await productsModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  await productsModel.updateProductById(productId, name);

  const findUpdateProduct = await productsModel.findById(productId);
  return { type: null, message: findUpdateProduct };
};

module.exports = {
  findAll,
  findById,
  createProduct,
  updateProduct,
};