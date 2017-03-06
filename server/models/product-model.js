/*globals module require*/

'use strict';

const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    usersLiked: [String],
    likes: { type: Number, default: 0 }
});

mongoose.model('Product', productSchema);

module.exports = mongoose.model('Product');