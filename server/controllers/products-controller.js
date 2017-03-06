'use strict';

module.exports = ({ grid, database, data, encryption }) => {
    return {
        getAll(req, res) {
            data.getAllProducts()
                .then((products) => {
                    res.status(200).json({
                        result: {
                            products
                        }
                    });
                })
        },
        likeProduct(req, res) {
            const id = req.params.id;

            data.incrementProductsLikes(id)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500).redirect('/500');
                });
        },
        dislikeProduct(req, res) {
            const id = req.params.id;

            data.decrementProductsLikes(id)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(() => {
                    res.status(500).redirect('/500');
                });
        },

        createProduct(req, res) {
            let gfs = grid(database.connection.db, database.mongo);

            let name = req.body.name;
            let price = req.body.price;
            let description = req.body.description;

            gfs.writeFile({}, req.file.buffer, (_, foundFile) => {
                let image = foundFile._id;

                data.createProduct(name, price, description, image)
                    .then(() => {
                        return res.status(201).json({
                            success: true,
                            message: 'Product created'
                        });
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