const { verifyToken } = require("../utils/verifyToken");
require("dotenv").config();

function isAuth(req, res, next) {
  const accessTokenFromHeader = req.headers?.authorization?.replace(
    "Bearer ",
    ""
  );
  // const token = req.cookies.refreshToken;
  // console.log("refresh token >>> ", req.cookies.refreshToken);
  if (!accessTokenFromHeader) {
    return res.status(406).send("Not found access token");
  }

  const verified = verifyToken(accessTokenFromHeader, process.env.REFRESH_TOKEN_SECRET || 'eduhub');

  if (!verified) {
    return res
      .status(401)
      .send("Bạn không có quyền truy cập vào tính năng này!");
  }
  req.userId = verified._id;

  return next();
}

module.exports = {
  isAuth,
};
