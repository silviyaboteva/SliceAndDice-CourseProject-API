'use strict';

module.exports = ({ grid, database, data, encryption }) => {
    return {
        getAllProducts(req, res) {
            data.getAllProducts()
                .then((products) => {
                    res.status(200).json({
                        result: {
                            products
                        }
                    });
                })
                .catch(() => {
                    res.status(500);
                });
        },
        getProductById(req, res) {
            let id = req.params.id;

            data.getProductById(id)
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500);
                });
        },
        getProductsByCategory(req, res) {
            let category = req.params.category.toLowerCase();
            console.log(category);
            data.getProductsByCategory(category)
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500);
                });
        },
        //Clearance
        getProductsByPrice(req, res) {
            let price = req.body.price;

            data.getProductsByPrice(price)
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500);
                });
        },
        //What's hot
        getMostPopularProducts(req, res) {
            data.getMostPopularProducts()
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500);
                });
        },
        likeProduct(req, res) {
            const id = req.params.id;

            data.incrementProductsLikes(id)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500);
                });
        },
        dislikeProduct(req, res) {
            const id = req.params.id;

            data.decrementProductsLikes(id)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500);
                });
        },

        createProduct(req, res) {
            let gfs = grid(database.connection.db, database.mongo);

            let name = req.body.name;
            let price = req.body.price;
            let description = req.body.description;
            let category = req.body.category;

            gfs.writeFile({}, req.file.buffer, (_, foundFile) => {
                let image = foundFile._id;

                data.createProduct(name, price, description, image, category)
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            message: 'Product created'
                        });
                    })
                    .catch(() => {
                        res.status(500);
                    });
            });
        },

        getProductImage(req, res) {
            let gfs = grid(database.connection.db, database.mongo);

            let id = req.params.id;

            gfs.exist({ _id: id }, (_, exists) => {
                if (!exists) {
                    res.status(404);
                    res.end();
                } else {
                    let readStream = gfs.createReadStream({ _id: id });
                    res.set('Content-Type', 'image/jpeg');

                    readStream.pipe(res);
                }
            });
        }

    };
};