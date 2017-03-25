'use strict';

const router = require('express').Router();

module.exports = ({ upload, app, controllers, auth }) => {
    const productController = controllers.products;

    router
        .get('/all', productController.getAllProducts)
        .get('/product/:id', productController.getProductById)
        .get('/category/:category', productController.getProductsByCategory)
        .get('/category/popular', productController.getMostPopularProducts)
        .get('/price', productController.getProductsByPrice)
        .get('/image/:id', productController.getProductImage)
        .post('/create', upload.single('image'), auth.isAuthenticated(), productController.createProduct)

    app.use('/api/products', router);
};