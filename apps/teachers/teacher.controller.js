const Teacher = require("./teacher.model");
const { uploadImg } = require("../../services/uploadImg");
const User = require('../users/user.model')
const { Role } = require("../../enum/Role");

async function createNewTeacher(req, res) {
    const data = req.body

    const newUser = new User({
        email: data.email,
        username: data.teacherId,
        password: data.dateOfBirth,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        roleName: Role.TEACHER,
    })

    if (req.file) {
        await uploadImg(req.file, "teacher")
            .then((url) => {
                newUser.avatarUrl = url[0];
            })
            .catch((err) => {
                return res.status(500).json({
                    success: false,
                    message: err.message,
                    data: null,
                });
            });
    }

    await User.findOne({ username: newUser.username })
        .then(user => {
            if (user) {
                return res.status(409).json({
                    success: false,
                    message: 'Username đã tồn tại',
                    data: null
                })
            } else {
                newUser.save()
                    .then((user) => {
                        const teacher = new Teacher({
                            userId: user._id,
                            teacherId: data.teacherId,
                            academicLevel: data.academicLevel,
                            position: data.position,
                            specialize: data.specialize,
                        })

                        teacher.save().then((T) => {
                            return res.status(200).json({
                                success: true,
                                message: 'Thêm giáo viên thành công',
                                data: T
                            })
                        }
                        ).catch((err) => {
                            return res.status(500).json({
                                success: false,
                                message: `error at insert teacher err: ${err.message}`,
                                data: null,
                            })

                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            success: false,
                            message: `error at insert user err: ${err.message}`,
                            data: null,
                        })
                    })
            }
        })

}

function getAllTeachers(req, res) {
    Teacher.find()
        .populate("userId")
        .then((results) => {
            const teachersDto = results.map(result => ({
                id: result._id,
                userId: result.userId._id,
                email: result.userId.email,
                firstName: result.userId.firstName,
                lastName: result.userId.lastName,
                dateOfBirth: result.userId.dateOfBirth,
                roleName: result.userId.roleName,
                teacherId: result.teacherId,
                academicLevel: result.academicLevel,
                position: result.position,
            }));
            console.log(teachersDto);
            return res.status(200).json({
                success: true,
                message: 'Thành công',
                data: teachersDto
            })
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message,
                data: null,
            })
        })
}

function deleteTeacher(req, res) {
    const id = req.params.id;
    Teacher.findByIdAndDelete(id)
        .then((result) => {
            return res.status(200).json({
                success: true,
                message: 'Thành công',
                data: result
            })
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message,
                data: null,
            })
        })
}

module.exports = {
    createNewTeacher,
    getAllTeachers,
    deleteTeacher,
};
