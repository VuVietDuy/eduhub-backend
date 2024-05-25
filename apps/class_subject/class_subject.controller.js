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

module.exports = {
    createClassSubject,
}