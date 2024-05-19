const Class = require("./class.model");

async function getAllClasses(req, res) {

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
    getAllClasses
}