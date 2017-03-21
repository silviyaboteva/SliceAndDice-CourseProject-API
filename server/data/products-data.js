/* globals module require */
'use strict';

module.exports = function(models, validator) {
    const Product = models.Product;

    return {
        getAllProducts() {
            return new Promise((resolve, reject) => {
                let products = Product.find({});

                resolve(products);
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
        getProductsByCategory(category, pageNumber, pageSize) {
            return new Promise((resolve, reject) => {
                let products = Product.find({ category: category }, (err, product) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!product) {
                        return resolve(null);
                    }
                    return resolve(products);
                });
            });
        },
        getProductsByPrice(price) {
            return new Promise((resolve, reject) => {
                const products = Product.find({ price }, (err) => {
                        if (err) {
                            return reject(err);
                        }

                        if (!products) {
                            return resolve(null);
                        }
                    })
                    .sort({ 'price': 'inc' })
                    .limit(5);

                resolve(products)
            });
        },
        getMostPopularProducts() {
            return new Promise((resolve, reject) => {
                const product = Product.find({})
                    .sort({ 'likes': 'desc' })
                    .limit(5);

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
        createProduct(name, price, description, image, category) {
            let product = new Product({
                name,
                price,
                description,
                image,
                category
            });

            return new Promise((resolve, reject) => {
                product.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(product);
                });
            });
        }
    };
};