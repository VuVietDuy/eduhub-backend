const { Role } = require("../enum/Role");
const { verifyToken } = require("../utils/verifyToken");
require("dotenv").config();

function isAuth(req, res, next) {
  const accessTokenFromHeader = req.headers?.authorization?.replace(
    "Bearer ",
    ""
  );
  if (!accessTokenFromHeader) {
    return res.status(406).send("Not found access token");
  }

  const verified = verifyToken(accessTokenFromHeader, process.env.REFRESH_TOKEN_SECRET || 'eduhub');

  if (!verified) {
    return res
      .status(401)
      .send("Bạn không có quyền truy cập vào tính năng này!");
  }
  req.userId = verified.userId;
  req.roleName = verified.roleName;

  return next();
}


function isAdmin(req, res, next) {
  if (req.roleName === Role.ADMIN) {
    return next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền truy cập tài nguyên này, tài nguyên này chỉ đành cho admin",
      data: null
    })
  }

}

module.exports = {
  isAuth,
  isAdmin
};
