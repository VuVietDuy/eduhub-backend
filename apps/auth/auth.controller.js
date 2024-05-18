const User = require('../users/user.model')
require('dotenv').config();
const bcrypt = require('bcryptjs');

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

                        const accessToken = genJWT(dataForAccessToken, process.env.ACCESS_TOKEN_SECRET || 'eduhub', '15m');
                        if (!accessToken) {
                            return res.status(406).json({
                                success: false,
                                message: "Đăng nhập không thành công",
                                data: null
                            })
                        }

                        const refreshToken = genJWT(dataForAccessToken, process.env.REFRESH_TOKEN_SECRET || 'eduhub', '30d');
                        if (!accessToken) {
                            return res.status(406).json({
                                success: false,
                                message: "Đăng nhập không thành công",
                                data: null
                            })
                        }

                        res.cookie('refreshToken', refreshToken, {
                            maxAge: 365 * 24 * 60 * 60 * 100,
                            httpOnly: true,
                            secure: true,
                        })

                        return res.status(200).json({
                            success: true,
                            message: "Đăng nhập thành công",
                            data: {
                                user: user,
                                accessToken: accessToken,
                            }
                        })
                    } else {
                        return res.status(406).json({
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
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });
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

async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    console.log("refresh token >>> ", refreshToken)

    if (!refreshToken) return res.sendStatus(401);
    const verified = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'eduhub');

    if (!verified) {
        return res
            .status(403)
            .send("Refresh token không tồn tại");
    }

    const accessToken = genJWT({ _id: verified._id }, process.env.ACCESS_TOKEN_SECRET || 'eduhub', '15m');
    res.status(200).json({ accessToken: accessToken });
}

module.exports = {
    register,
    login,
    logout,
    verify,
    refreshToken
}