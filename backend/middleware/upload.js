'use strict';

const util = require('util');
const multer = require('multer');
const path = require('path');
const MAX_SIZE = 5 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + "/public/uploads");
    },
    filename: (req, file, cb) => {
    //   console.log(file.originalname);
      cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    },
  });

  let uploadFile = multer({
    storage: storage,
    limits: { fileSize: MAX_SIZE },
    fileFilter: function(req, file, callback)
    {
        const ext = path.extname(file.originalname);
        const mime = file.mimetype;
        if(ext.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/) && mime.includes('image'))
            return callback(null, true);
        else
        {
            req.validationError = 'Only images allowed';
            // return callback(new Error('Only images allowed'));
            return callback(null, false);
        }

    }
  }).single("imagen");

module.exports = uploadFile;
// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;