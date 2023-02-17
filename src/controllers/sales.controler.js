const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSaleProducts = async (req, res) => {
  const request = req.body;
  const { type, message } = await salesService.createSalesProducts(request);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

const listAllSalesProducts = async (_req, res) => {
  const { type, message } = await salesService.findAllSalesProducts();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const getSalesProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSalesProductById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  createSaleProducts,
  listAllSalesProducts,
  getSalesProductById,
};