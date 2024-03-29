const { verifyToken } = require('../utils/verifyToken');
require('dotenv').config();


function isAuth(req, res, next) {
    const accessTokenFromHeader = req.headers?.authorization?.replace('Bearer ', '');
    if (!accessTokenFromHeader) {
        return res.status(401).send("Not found access token");
    };

    const verified = verifyToken(accessTokenFromHeader);
    console.log(verified);

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
