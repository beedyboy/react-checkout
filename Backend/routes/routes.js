const { Router } = require('express');
const { productControls } = require('../controllers/Product.controls');

const routemanager = Router();

routemanager.get('/', productControls.getAllProducts);

routemanager.post('/addProducts', productControls.addProducts);

routemanager.get('/cart', productControls.getCart);

module.exports = { routemanager };
