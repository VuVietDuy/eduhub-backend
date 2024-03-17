const Subject = require('../models/Subject');

function createNewSubject(req, res) {
    const newSubject = new Subject(req.body)
    newSubject.save()
        .then(subject => {
            return res.status(200).json({
                success: true,
                message: 'Thanh cong',
                data: subject
            })
        })
        .catch(err => {
            return res.status(200).json({
                success: false,
                message: err.message
            })
        })
}

function getAllSubject(req, res) {
    Subject.find()
        .then((allSubject) => {
            return res.status(200).json({
                success: true,
                message: 'Successful',
                data: allSubject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}

function deleteSubject(req, res) {
    const subjectId = req.params.id
    console.log(subjectId);
    Subject.findByIdAndDelete(subjectId)
        .then(subject => {
            return res.status(200).json({
                success: true,
                message: "Xoá môn học thành công",
                data: subject,
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
    createNewSubject,
    getAllSubject,
    deleteSubject
};


