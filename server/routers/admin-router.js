/*globals */
'use strict';

const passport = require('passport');
const router = require('express').Router();
const auth = require('../config/auth');

module.exports = function({ app, controllers }) {
    const adminController = controllers.admin;

    router
        .get('/users/all', auth.isAuthenticated(), auth.isInRole('admin'), adminController.getAllUsers)
        .post('/users/makeadmin/:id', auth.isAuthenticated(), auth.isInRole('admin'), adminController.makeUserAdmin)
        .post('/products/product/:id', auth.isAuthenticated(), auth.isInRole('admin'), adminController.addProduct)
        .delete('/products/product/:id', auth.isAuthenticated(), auth.isInRole('admin'), adminController.deleteProduct);

    app.use('/api/admin', router);
};