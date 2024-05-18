const jwt = require('jsonwebtoken');

const verifyToken = (token, secretKey) => {
    var decode = null;
    jwt.verify(token, secretKey, function (err, res) {
        if (err) {
            console.log("Error at verify token >> ", err);
            return;
        }
        decode = res
    });
    return decode;
}

module.exports = {
    verifyToken,
}