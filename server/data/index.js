/*globals */
'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function() {

    let User = require('../models/user-model'),
        Product = require('../models/product-model'),
        validator = require('../models/utils/validator');
    let models = { User, Product };
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