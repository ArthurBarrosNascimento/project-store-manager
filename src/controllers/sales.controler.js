const { salesService } = require('../services');
const errorMap = require('../utils/errorMap');

const createSaleProducts = async (req, res) => {
  const request = req.body;
  const { type, message } = await salesService.createSalesProducts(request);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  createSaleProducts,
};