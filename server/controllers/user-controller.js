'use strict';

module.exports = function({ grid, database, data, encryption }) {
    return {
        _validateToken(req, res) {
            let token = req.headers.authorization;
            if (!token) {
                return res.json({
                    success: false,
                    message: 'You must be loged in order to vote'
                });
            }
            token = token.substring(1, token.length - 1);
            let user = encryption.deciferToken(token);
            if (!user) {
                return res.json({
                    success: false,
                    message: 'You must be loged in order to vote'
                });
            }
        },
        getProfile(req, res) {
            res.json({ result: { user: req.user } });
        },
        editProfile(req, res) {
            const username = req.user.username;

            const userInfo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            };

            data.updateUserInformation(username, userInfo)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Profile information updated!' } });
                })
                .catch(() => {
                    return res.status(500).json({ error: { message: "User information could not be updated" } })
                });
        },
        getCart(req, res) {
            const username = req.user.username;
            data.getUserCartProducts(username)
                .then((products) => {
                    res.json({ result: { products } });
                })
        },
        addToCart(req, res) {
            const username = req.user.username;
            const product = req.body;

            data.addProductToCart(username, product)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Product added to cart!' } });
                })
                .catch(() => {
                    return res.status(500).json({ error: { message: 'Product could not be added to cart!' } });
                });
        },
        removeFromCart(req, res) {
            const username = req.user.username;
            const product = req.body;

            data.removeProductFromCart(username, product)
                .then(() => {
                    return res.json({ result: { success: true, message: 'Product removed from cart!' } });
                })
        },
        getAvatar(req, res) {
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