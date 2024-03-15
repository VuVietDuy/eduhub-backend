const User = require('../models/User')

function register(req, res) {
    console.log(req.body);
    return res.json(req.body);
    // try {
    //     const newUser = new User(req.body)
    //     newUser.save();
    //     return res.status(200).json({
    //         success: true,
    //         message: 'Thanh cong',
    //         data: newUser
    //     })
    // } catch (err) {
    //     return  res.status(200).json({
    //         success: false,
    //         message: err.message
    //     })
    // }
}

module.exports = {
    register,
}