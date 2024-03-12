const Subject = require('../models/Subject');

function createNewSubject(req, res) {
    //to do something
    console.log(req.body);
    try {
        const newSubject = new Subject(req.body)
        newSubject.save();
        return res.status(200).json({
            success: true,
            message: 'Thanh cong',
            data: newSubject
        })
    } catch (err) {
        return  res.status(200).json({
            success: false,
            message: err.message
        })
    }
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

module.exports = {
    createNewSubject,
    getAllSubject
};


