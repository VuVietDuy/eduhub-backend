const Student = require("../students/student.model");
const Class = require("./class.model");
const Subject = require("../subjects/subject.model");
const ClassSubject = require("../class_subject/class_subject.model");

async function getAllClasses(req, res) {
    Class.find()
        .then((T) => {
            return res.status(200).json({
                success: true,
                message: "Successful",
                data: T,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err.message,
                data: null,
            });
        });
}

async function getClassById(req, res) {
    try {
        const classID = req.params.id;

        // Find the class and populate the required fields
        const c = await Class.findById(classID)
            .populate({ path: "formTeacher", select: "firstName lastName avatarUrl -_id" })
            .populate({ path: "monitor", select: "firstName lastName avatarUrl -_id" })
            .populate({ path: "viceMonitor", select: "firstName lastName avatarUrl -_id" });

        if (!c) {
            return res.status(404).json({
                success: false,
                message: "Class not found",
                data: null,
            });
        }

        // Count the number of students in the class
        const count = await Student.countDocuments({ classId: c._id });

        return res.status(200).json({
            success: true,
            message: "Successful",
            data: {
                count: count,
                classInfo: c,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            data: null,
        });
    }
}

async function createNewClass(req, res) {
    const newClass = new Class(req.body);
    await newClass.save().then((c) => {
        return res.status(200).json({
            success: true,
            data: c,
        })
    })
}

async function getClassSubjectByClassId(req, res) {
    const classId = req.params.classId;
    var data = [
    ]
    await Subject.find()
        .then((subjects) => {
            subjects.map((subject) => {
                var tmp = {
                    subject: subject,
                    teacher: null
                }
                // console.log(tmp);
                ClassSubject.find({ subject: subject._id, class: classId })
                    // .populate('teacher')
                    .then((cs) => {
                        if (cs.length > 0) {

                            tmp.teacher = cs[0].teacher
                            console.log(cs);
                            console.log(cs[0]?.teacher);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                data = [...data, tmp]

            })
            return res.status(200).json({
                success: true,
                data: data,
            })
        })
}

async function getStudentsClassById(req, res) {
    const classId = req.params.classId;
    Student.find({ classId: classId })
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

module.exports = {
    createNewClass,
    getAllClasses,
    getClassById,
    getClassSubjectByClassId,
    getStudentsClassById
}