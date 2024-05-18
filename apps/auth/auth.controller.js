const User = require('../users/user.model')
require('dotenv').config();
const bcrypt = require('bcryptjs');

const { sendEmail } = require('../../utils/sendEmail');
const { genHtmlMailAuth } = require('../../utils/genHtmlMailAuth');
const { genJWT } = require('../../utils/genJWT');
const { verifyToken } = require('../../utils/verifyToken');

async function register(req, res) {
    await User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(409).json({
                    success: false,
                    message: 'Username đã tồn tại',
                    data: null
                })
            } else {
                const newUser = new User(req.body)
                newUser.save()
                    .then((user) => {
                        const data = {
                            userId: user._id,
                        }
                        const token = genJWT(data, '10m');
                        // sendEmail(user.username, 'Xác thực username', genHtmlMailAuth(`http://localhost:8000/api/auth/verify/${token}`, user.firstName));
                        return res.status(200).json({
                            success: true,
                            message: 'Đăng ký thành công',
                            data: user
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            success: false,
                            message: err.message,
                            data: null,
                        })
                    })
            }
        })
}

function login(req, res) {
    const client = req.body;
    User.findOne({ username: client.username })
        .then(async (user) => {
            if (user) {
                bcrypt.compare(client.password, user.password, function (err, result) {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({
                            success: false,
                            message: "Lỗi server",
                            data: null
                        })
                    }
                    if (result) {
                        const dataForAccessToken = {
                            _id: user._id,
                        };

                        const accessToken = genJWT(dataForAccessToken, '3d');
                        if (!accessToken) {
                            return res.status(401).json({
                                success: false,
                                message: "Đăng nhập không thành công",
                                data: null
                            })
                        }

                        return res.status(200).json({
                            success: true,
                            message: "Đăng nhập thành công",
                            data: {
                                user: user,
                                accessToken: accessToken,
                            }
                        })
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: "Sai mật khẩu",
                            data: null
                        })
                    }
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Tài khoản không tồn tại",
                    data: null
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message,
                data: null
            })
        })
}

async function logout(req, res) {
    console.log('Logout');
    return res.status(200).json({
        success: true,
        message: "Đăng xuất",
        data: null,
    })
}

async function verify(req, res) {
    const token = req.params.token;
    const data = verifyToken(token)
    if (data) {
        await User.findByIdAndUpdate(data.userId, { verified: true })
            .then(() => {
                return res.redirect('http://localhost:300/login')
            })
            .catch(err => {
                return res.status(500).json({
                    success: false,
                    message: err.message,
                    data: null,
                })
            })
    } else {
        return res.status(500).json({
            success: false,
            message: "Hết hạn, vui lòng xác minh lại",
            data: null,
        })
    }
}

module.exports = {
    register,
    login,
    logout,
    verify,
}