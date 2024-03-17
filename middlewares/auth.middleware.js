const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (token) => {
    var decode = null;
    const key = process.env.ACCESS_TOKEN_SECRET || 'eduhub';
    try {
        decode = jwt.verify(token, key);
    } catch (err) {
        console.log("Erorr >> ",err);
    }
    return decode;
}

function isAuth(req, res, next) {
    const accessTokenFromHeader = req.headers?.authorization?.replace('Bearer ', '');
    if (!accessTokenFromHeader) {
        return res.status(401).send("Not found access token");
    };

    const verified = verifyToken(accessTokenFromHeader);

    if (!verified) {
        return res
            .status(401)
            .send('Bạn không có quyền truy cập vào tính năng này!');
    }

    return next();
}

module.exports = {
    isAuth,
};
