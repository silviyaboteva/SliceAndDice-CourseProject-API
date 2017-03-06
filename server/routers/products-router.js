'use strict';

const router = require('express').Router();

module.exports = ({ upload, app, controllers, auth }) => {
    const controller = controllers.products;

    router.post('/create', upload.single('image'), auth.isAuthenticated(), controller.createProduct)
        .get('/image/:id', controller.getProductImage)

    app.use('/api/products', router);
};