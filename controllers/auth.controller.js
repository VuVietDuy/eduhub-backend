const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');


const createJWT = (payload) => {
    const key = process.env.ACCESS_TOKEN_SECRET || 'eduhub';
    var token = jwt.sign(payload, key);
    console.log(token);
    return token;
}

function register(req, res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(409).json({
                    success: false,
                    message: 'Email đã tồn tại',
                    data: null
                })
            } else {
                const newUser = new User(req.body)
                newUser.save()
                    .then(() => {
                        return res.status(409).json({
                            success: true,
                            message: 'Đăng ký thành công',
                            data: newUser
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
    User.findOne({email: client.email})
    .then(async (user) => {
        if(user) {
            bcrypt.compare(client.password, user.password, function(err, result) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        success: false,
                        message: "Lỗi server",
                        data: null
                    })
                }
                console.log(result);
                if (result) {
                    const dataForAccessToken = {
                        _id: user._id,
                    };
                    
                    const accessToken = createJWT(dataForAccessToken);
    
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

module.exports = {
    register,
    login,
    logout,
}