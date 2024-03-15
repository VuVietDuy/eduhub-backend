const express = require('express');
const router = express.Router();
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), function (req, res, next) {
  const file = req.file
  if (!file) {
    // const error = new Error('Please upload a file')
    // error.httpStatusCode = 400
    return res.send('ss')
  }
  res.send('file')
})


module.exports = router;