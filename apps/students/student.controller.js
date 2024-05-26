const { Role } = require("../../enum/Role");
const Student = require("./student.model");
const User = require("../users/user.model");

async function createNewStudent(req, res) {
    const data = req.body

    const newUser = new User({
        email: data.email,
        username: data.studentId,
        password: data.dateOfBirth,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth,
        permanentAddress: data.permanentAddress,
        citizenIdentification: data.citizenIdentification,
        issuedBy: data.issuedBy,
        description: data.description,
        roleName: Role.STUDENT,
    })

    if (req.file) {
        await uploadImg(req.file, "student")
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
                        const student = new Student({
                            userId: user._id,
                            studentId: data.studentId,
                            classId: data.classId,
                        })

                        student.save().then((T) => {
                            return res.status(200).json({
                                success: true,
                                message: 'Thêm học sinh thành công',
                                data: T
                            })
                        }
                        ).catch((err) => {
                            return res.status(500).json({
                                success: false,
                                message: `error at insert student err: ${err.message}`,
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

function getAllStudents(req, res) {
    Student.find()
        .populate("userId")
        .then((results) => {
            const studentsDto = results.map(result => ({
                id: result._id,
                userId: result.userId._id,
                email: result.userId.email,
                firstName: result.userId.firstName,
                lastName: result.userId.lastName,
                dateOfBirth: result.userId.dateOfBirth,
                roleName: result.userId.roleName,
                studentId: result.studentId,
                classId: result.classId,
            }));
            return res.status(200).json({
                success: true,
                message: 'Thành công',
                data: studentsDto
            })
        }).catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message,
                data: null,
            })
        })
}

function deleteStudent(req, res) {

}

module.exports = {
    createNewStudent,
    getAllStudents,
    deleteStudent,
};
