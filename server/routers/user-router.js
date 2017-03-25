'use strict';
const multer = require('multer');
const path = require('path');
const router = require('express').Router();

module.exports = function({ upload, app, controllers, passport, auth }) {
    const userController = controllers.user;

    router
        .get('/user/image/:id', userController.getAvatar)
        .get('/user/:username', userController.getProfile)

    app.use('/api/users', router);
};