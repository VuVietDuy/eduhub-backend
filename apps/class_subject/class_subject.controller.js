const ClassSubject = require('./class_subject.model')

async function createClassSubject(req, res) {
    const newClassSubject = new ClassSubject(req.body)
    newClassSubject.save().then((result) => {
        return res.status(200).json({
            success: true,
            data: result
        })
    })
}

async function getAllClassSubject(req, res) {
    ClassSubject.find()
        .populate('class')
        .populate('subject')
        .then((data) => {
            return res.status(200).json({
                data: data
            })
        })
}

module.exports = {
    createClassSubject,
    getAllClassSubject
}