'use strict';
const multer = require('multer');
const path = require('path');
const router = require('express').Router();

module.exports = function({ upload, app, controllers, passport, auth }) {
    const userController = controllers.user;
    let img = '';

    const storageAvatar = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.join(__dirname, '../../public/images/user-аvatar-images/'));
        },
        filename: function(req, file, cb) {
            img = Date.now() + file.originalname;
            cb(null, img);
        }
    });

    const uploadAvatar = multer({
        storage: storageAvatar
    });

    router
    //TODO

    app.use('/api/users', router);
};