'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

module.exports = (config, app) => {

    app.use(cookieParser());
    app.use(session({
        secret: 'magic',
        cookie: { maxAge: 60 * 60 * 60 * 1000 },
        rolling: true,
        resave: true,
        saveUninitialized: false
    }));

    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.options('*', cors());
    require('./passport')(app);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};