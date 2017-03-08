'use strict';
const multer = require('multer');
const path = require('path');
const router = require('express').Router();

module.exports = function({ upload, app, controllers, passport, auth }) {
    const userController = controllers.user;

    router
        .get('/profile/avatar/:id', userController.getAvatar)
        .get('/profile/:id', userController.getProfile)

    app.use('/api/users', router);
};