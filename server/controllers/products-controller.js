'use strict';

module.exports = ({ data }) => {
    return {
        getAll(req, res) {
            data.getAllProducts()
                .then((products) => {
                    res.status(200).json({ result: { products } });
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
        }
    };
};