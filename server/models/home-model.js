/*globals module require*/

'use strict';

const mongoose = require('mongoose');

let homeSchema = new mongoose.Schema({
    mainImages: {
        type: [String],
        required: true
    },
    categoriesImage: {
        type: String,
        required: true
    },
    products: {
        imagesLink: {
            type: [String],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    clearance: {
        imagesLink: {
            type: [String],
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    brands: {
        imagesLink: {
            type: [String],
            required: true
        }
    },
    aboutInfo: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    creditCards: {
        imagesLink: [String],
        required: true
    }
});

mongoose.model('Home', homeSchema);

module.exports = mongoose.model('Home');