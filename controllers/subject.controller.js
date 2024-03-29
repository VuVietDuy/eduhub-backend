const Subject = require('../models/Subject');
const { uploadImg } = require('../services/uploadImg');

async function createNewSubject(req, res) {
    var newSubject = new Subject(req.body);

    if(req.file) {
        await uploadImg(req.file, 'subject')
        .then(url => {
            newSubject.imgUrl = url[0];
            console.log(url[0]);
        })
        .catch(err => {
            return res.status(500).json({
                success: false,
                message: err.message,
                data: null,
            })
        })
    }

    await newSubject.save()
        .then(subject => {
            return res.status(200).json({
                success: true,
                message: 'Thanh cong',
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
                message: err.message,
                data: null,
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


