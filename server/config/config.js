const path = require('path');
const rootPath = path.normalize(path.join(__dirname, '/../../'));
const PORT = process.env.PORT || 1337;
//'mongodb://admin:admin123456@ds113670.mlab.com:13670/look-shop-db'
module.exports = {
    development: {
        rootPath: rootPath,
        connectionString: 'mongodb://localhost:27017/LookShopDb',
        port: PORT,
        secret: 'magicstring'
    },
    production: {
        rootPath: rootPath,
        connectionString: process.env.CONNECTION_STRING,
        port: PORT,
        secret: process.env.JWT_SECRET
    }
};