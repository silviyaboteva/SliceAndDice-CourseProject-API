const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
    generateSalt: () =>
        crypto.randomBytes(128).toString('base64'),
    generateHashedPassword: (salt, pwd) =>
        crypto.createHmac('sha256', salt).update(pwd).digest('hex'),
    deciferToken: (token) => {

        let decoded = jwt.decode(token.split(' ')[1], 'magicstring');

        let user = null;

        if (decoded === null) {
            // invalid Token
            return user;
        }

        const userInfo = decoded._doc;


        user = {
            username: userInfo.username
        };

        return user;
    }
};