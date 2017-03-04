'use strict';

module.exports = function({ data }) {
    return {
        getAllUsers(req, res) {

            data.getAllUsers()
                .then(users => {
                    res.status(200).json({
                        success: true,
                        data: users
                    });
                });
        },
        addProduct(req, res) {
            let productId = req.params.id;

            data.addProduct(productId)
                .then(result => {
                    res.status(201).json({
                        success: true,
                        message: 'Product was created succesfully!'
                    });
                });
        },
        deleteProduct(req, res) {
            let productId = req.params.id;

            data.deleteProduct(productId)
                .then(result => {
                    res.status(200).json({
                        success: true,
                        message: 'Product was deleted succesfully!'
                    });
                });
        },
        makeUserAdmin(req, res) {
            let userId = req.params.id;

            data.makeUserAdmin(userId)
                .then(result => {
                    res.status(201).json({
                        succes: true,
                        message: 'Operation succesfull!',
                        data: result
                    });
                })
                .catch(() => {
                    res.status(401).json({
                        succes: false,
                        message: ''
                    });
                });
        }
    };
};