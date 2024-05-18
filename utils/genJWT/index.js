const jwt = require('jsonwebtoken');

const genJWT = (payload, secretKey, expiresIn) => {
    var token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
    return token;
}

module.exports = {
    genJWT
}