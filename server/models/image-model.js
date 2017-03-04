/*globals module require*/

'use strict';

const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    }
});

mongoose.model('Image', imageSchema);

module.exports = mongoose.model('Image');