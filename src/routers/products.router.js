const express = require('express');
const { productsController } = require('../controllers');
const validationsInputsValues = require('../middlewares/validateNewProductsFilds');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProductById);
router.post('/', validationsInputsValues, productsController.createProduct);
router.put('/:id', validationsInputsValues, productsController.updateProjectById);

module.exports = router;