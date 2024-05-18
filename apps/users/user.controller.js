const User = require('./user.model')

async function createNewUser(req, res) {
    const newUser = new User(req.body)
    newUser.save()
        .then((user) => {
            return res.status(200).json({
                success: true,
                message: 'Tạo tài khoản thành công',
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

async function getAllUser(req, res) {
    const roleName = req.query.role_name;
    const offset = req.query.offset;
    await User.find(roleName === 'all' || !roleName ? null : { roleName: roleName })
        .skip(offset)
        .limit(req.query.limit)
        .sort({ createdAt: 'desc' })
        .then(users => {
            return res.status(200).json({
                success: true,
                message: "Danh sách tài khoản",
                data: users,
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

async function deleteUser(req, res) {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
        .then(user => {
            return res.status(200).json({
                success: true,
                message: "Xoá tài khoản thành công",
                data: user,
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

module.exports = {
    getAllUser,
    createNewUser,
    deleteUser,
}