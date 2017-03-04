'use strict';

const router = require('express').Router();

module.exports = function({ app, controllers }) {
    const home = controllers.home;

    router
        .get('/', home.getHomeInfo);

    app.use(router);
};