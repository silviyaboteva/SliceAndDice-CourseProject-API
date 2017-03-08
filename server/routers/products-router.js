'use strict';

const router = require('express').Router();

module.exports = ({ upload, app, controllers, auth }) => {
    const productController = controllers.products;

    router
        .get('/all', productController.getAllProducts)
        .get('/:id', productController.getProductById)
        .get('/category', productController.getProductsByCategory)
        .get('/price', productController.getProductsByPrice)
        .get('/popular', productController.getMostPopularProducts)
        .get('/image/:id', productController.getProductImage)
        .post('/create', upload.single('image'), auth.isAuthenticated(), productController.createProduct)

    app.use('/api/products', router);
};