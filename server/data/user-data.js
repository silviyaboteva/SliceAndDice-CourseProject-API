/* globals module, require */
'use strict';

module.exports = (models) => {
    const { User } = models;
    const { Course } = models;

    return {
        getAll() {
            return new Promise((resolve, reject) => {
                User.find({}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                });
            });
        },
        getByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                });
            });
        },
        getUserByEmail(email) {
            return new Promise((resolve, reject) => {
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                });
            });
        },
        getUserById(userId) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userId }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        createUser(username, passHash, avatar, email, salt) {
            let user = new User({
                username: username,
                passHash: passHash,
                email: email,
                salt: salt,
                roles: ['regular'],
                avatar: avatar
            });

            return new Promise((resolve, reject) => {
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserCartProducts(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ 'username': username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject({ error: 'User not found' });
                    }

                    return resolve(user.cartProducts);
                })
            });
        },
        addProductToCart(username, product) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $addToSet: { 'cartProducts': product } })
                    .then(() => {
                        resolve();
                    }).catch(err => reject(err));
            });
        },
        removeProductFromCart(username, product) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({ 'username': username }, { $pull: { 'cartProducts': product } })
                    .then(() => {
                        resolve();
                    }).catch(err => reject(err));
            });
        },
        uploadAvatar(username, img, password) {
            return new Promise((resolve, reject) => {
                this.getByUsername(username)
                    .then(user => {
                        let passHashFromReq = user.generatePassHash(password);
                        if (passHashFromReq !== user.passHash) {
                            return reject();
                        }

                        user.avatar = img;
                        user.save();
                        resolve(user);
                    });
            });
        },
        getAvatar(username) {
            return new Promise((resolve, reject) => {
                this.getByUsername(username)
                    .then(result => {
                        resolve(result.avatar);
                    });
            });
        }
    };
};