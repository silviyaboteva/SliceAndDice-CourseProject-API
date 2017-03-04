/*globals */
'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    let User = require('../models/user-model'),
        Home = require('../models/home-model'),
        Image = require('../models/image-model'),
        Product = require('../models/product-model'),
        validator = require('../models/utils/validator');
    let models = { User, Home, Image, Product };
    let data = {};

    fs.readdirSync(__dirname)
        .filter(x => x.includes('-data'))
        .forEach(file => {
            let dataModule = require(path.join(__dirname, file))(models, validator);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};