const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config();


const createJWT = (payload) => {
    const key = process.env.ACCESS_TOKEN_SECRET || 'eduhub';
    var token = jwt.sign(payload, key);
    console.log(token);
    return token;
}

const verifyToken = (token) => {
    var decode = null
    const key = process.env.ACCESS_TOKEN_SECRET || 'eduhub';
    try {
        decode = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decode;
}

function checkPassword(inputPassword, password) {
    return inputPassword === password;
}

function register(req, res) {
    console.log(req.body);
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
    console.log(req.body);
    const client = req.body;
    User.findOne({email: client.email})
    .then((user) => {
        if(user) {
            if(checkPassword(client.password, user.password)) {
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
                    success: true,
                    message: "Sai mật khẩu",
                    data: null
                })
            }
        } else {
            return res.status(404).json({
                success: true,
                message: "Tài khoản không tồn tại",
                data: null
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            success: true,
            message: err.message,
            data: null
        })
    })
}

module.exports = {
    register,
    login
}