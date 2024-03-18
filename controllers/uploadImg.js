const firebase = require('../config/firebase')
var multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const upload = multer({
    storage: multer.memoryStorage(),
})

async function uploadImg(file, folderPath) {

    return new Promise((resolve, reject) => {
        if (!file) {
            reject("File not found");
        }
        const blob = firebase.bucket.file(`${folderPath}/${uuidv4()}${file.originalname}`)
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        })

        blobWriter.on('error', (err) => {
            reject(err)
        })

        blobWriter.on('finish', async () => {
            const url = await blob.getSignedUrl({ action: 'read', expires: '01-01-2026' });
            resolve(url)
        })

        blobWriter.end(file.buffer)
    })
}

module.exports = {
    uploadImg,
    upload
}