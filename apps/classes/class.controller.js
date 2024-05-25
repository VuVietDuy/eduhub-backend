const Student = require("../students/student.model");
const Class = require("./class.model");

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

module.exports = {
    createNewClass,
    getAllClasses,
    getClassById
}