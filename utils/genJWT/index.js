const jwt = require('jsonwebtoken');

const genJWT = (payload, expiresIn) => {
    const key = process.env.ACCESS_TOKEN_SECRET || 'eduhub';
    var token = jwt.sign(payload, key, {expiresIn: expiresIn});
    return token;
}

module.exports = {
    genJWT
}