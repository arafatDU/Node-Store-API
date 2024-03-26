const express = require('express');
const { getAllProducts, getAllProductsStatic, getAllProductsStatic2, getAllProductsStatic3, getAllProductsStatic4 } = require('../controllers/productController.js');

const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/static').get(getAllProductsStatic);
router.route('/static2').get(getAllProductsStatic2);
router.route('/static3').get(getAllProductsStatic3);
router.route('/static4').get(getAllProductsStatic4);


module.exports = router;


