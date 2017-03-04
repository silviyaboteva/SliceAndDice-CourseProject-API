'use strict';

module.exports = function({ data }) {
    return {
        getHomeInfo(req, res) {
            data.getHomeInfo()
                .then(info => {
                    res.json({ result: { info } });
                })
                .catch(() => {
                    res.json({ message: 'Information not found' });
                });
        },
        getMainImages(req, res) {
            data.getHomeInfo()
                .then(info => {
                    res.json({ result: { info: info.mainImages } });
                })
                .catch(() => {
                    res.json({ message: 'Images not found' });
                });
        },
        getCategoriesImage(req, res) {
            data.getRestaurantInfo()
                .then(info => {
                    res.json({ result: { info: info.categoriesImage } });
                })
                .catch(() => {
                    res.json({ message: 'Images not found' });
                });
        },
        getProducts(req, res) {
            data.getHomeInfo()
                .then(info => {
                    res.json({ result: { info: info.products } });
                })
                .catch(() => {
                    res.json({ message: 'Products not found' });
                });
        },
        getClearance(req, res) {
            data.getHomeInfo()
                .then(info => {
                    res.json({ result: { info: info.clearance } });
                })
                .catch(() => {
                    res.json({ message: 'Products in clearance not found' });
                });
        },
        getBrands(req, res) {
            data.getHomeInfo()
                .then(info => {
                    res.json({ result: { info: info.brands } });
                })
                .catch(() => {
                    res.json({ message: 'Brands not found' });
                });
        },
        getAboutInfo(req, res) {
            data.getHomeInfo()
                .then(info => {
                    res.json({ result: { info: info.aboutInfo } });
                })
                .catch(() => {
                    res.json({ message: 'About info not found' });
                });
        },
        getCreditCards(req, res) {
            data.getHomeInfo()
                .then(info => {
                    res.json({ result: { info: info.creditCards } });
                })
                .catch(() => {
                    res.json({ message: 'Credit cards not found' });
                });
        }
    };
};