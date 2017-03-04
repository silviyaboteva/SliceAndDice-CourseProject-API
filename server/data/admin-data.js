/* globals module, require */
'use strict';

module.exports = (model) => {
    const User = model;
    return {
        makeUserAdmin(userId) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: userId }, (err, foundUser) => {
                    if (err) {
                        return reject(err);
                    }

                    foundUser.assignRole('admin');
                    foundUser.save();
                    return resolve(foundUser);
                });
            });
        },
        addProduct(productId) {
            //TODO
        },
        deleteProduct(productId) {
            //TODO
        }
    };
};