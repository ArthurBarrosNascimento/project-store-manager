const { salesModel, productsModel } = require('../models');
const schema = require('./validation/validationsInputsValues');

const createSalesProducts = async (salesProduct) => {
  const error = await schema.validateQuantity(salesProduct);
  if (error.type) return error;

  const prodctsId = salesProduct.map((x) => x.productId);
  const verifyIfProductIdExist = await Promise.all(prodctsId.map((x) => productsModel.findByID(x)));
  if (verifyIfProductIdExist.some((x) => typeof x === 'undefined')) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const idSales = await salesModel.createIdSales();

   await Promise.all(salesProduct
     .map((x) => salesModel.insertSalesProducts(idSales, x.productId, x.quantity)));
  
  const getSalesProductById = await salesModel.searchSalesProductById(idSales);

  const returnSalesProject = {
    id: idSales,
    itemsSold: getSalesProductById,
  };
  return { type: null, message: returnSalesProject };
};

const findAllSalesProducts = async () => {
  const listSalesProduct = await salesModel.findAllSalesProducts();
  return { type: null, message: listSalesProduct };
};

const findSalesProductById = async (id) => {
  const error = await schema.validateId(id);
  if (error.type) return error;

  const verifyIdSales = await salesModel.findSaleById(id);
  if (!verifyIdSales) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  const listSalesProductById = await salesModel.findSalesProductById(id);

  return { type: null, message: listSalesProductById };
};

module.exports = {
  createSalesProducts, 
  findAllSalesProducts,
  findSalesProductById,
};