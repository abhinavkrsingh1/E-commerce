const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage }).single('file');

const multiupload = multer({
  storage: multer.memoryStorage()
}).array('files',5);

module.exports = { upload, multiupload };