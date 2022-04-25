const multer = require('multer');

const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    fs.mkdir('../backend/images', { recursive: true }, function (error) {
      if (error) {
        console.error(error);
      }
      else {
        callback(null, 'images');
        console.error('Image correctement ajoutée au dossier \'images\' !');
      }
    });
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').substring(0, file.originalname.lastIndexOf('.'));
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');