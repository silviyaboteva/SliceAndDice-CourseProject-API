/* globals module require */
'use strict';

module.exports = function(models) {
    const Image = models.Image;
    const HomeInfo = models.Home;
    return {
        getAllImages() {
            return new Promise((resolve, reject) => {
                Image.find({}, function(err, images) {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(images);
                });
            });
        },
        getHomeInfo() {
            return new Promise((resolve, reject) => {
                HomeInfo.find({}, function(err, info) {
                    if (err) {
                        return reject(err);
                    };

                    return resolve(info[0]);
                });
            });
        }
    };
};