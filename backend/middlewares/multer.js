const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Adjust the destination directory as needed
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    const filename = `${file.fieldname}-${Date.now()}.${fileExtension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};