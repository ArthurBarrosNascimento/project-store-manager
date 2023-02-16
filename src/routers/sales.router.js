const express = require('express');
const { salesController } = require('../controllers');
const validateNewSalesProductsFilds = require('../middlewares/validateNewSalesProductsFilds');

const router = express.Router();

router.post('/', validateNewSalesProductsFilds, salesController.createSaleProducts);

module.exports = router;