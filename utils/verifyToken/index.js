const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    const key = process.env.ACCESS_TOKEN_SECRET || 'eduhub';
    var decode = null;
    jwt.verify(token, key, function(err, res) {
        if(err) {
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