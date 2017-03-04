/* globals module require */
'use strict';

module.exports = function(models, validator) {
    const Product = models.Product;

    return {
        getAllProducts() {
            return new Promise((resolve, reject) => {
                Product.find({}, function(err, meals) {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(meals);
                });
            });
        },
        getProductById(id) {
            return new Promise((resolve, reject) => {
                Product.findOne({ _id: id }, (err, product) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!product) {
                        return resolve(null);
                    }

                    return resolve(product);
                });
            });
        },
        getMostPopularProducts() {
            return new Promise((resolve, reject) => {
                const product = Product.find({})
                    .sort({ 'likes': 'desc' })
                    .limit(10);

                resolve(product);
            });
        },
        incrementProductsLikes(_id) {
            return new Promise((resolve, reject) => {
                Product.findByIdAndUpdate({ '_id': _id }, { '$inc': { 'likes': 1 } },
                    (err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    })
            });
        },
        decrementProductsLikes(_id) {
            return new Promise((resolve, reject) => {
                Product.findByIdAndUpdate({ '_id': _id, "score": { "$gt": 0 } }, { '$inc': { 'likes': -1 } },
                    (err) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve();
                    })
            });
        },
    };
};