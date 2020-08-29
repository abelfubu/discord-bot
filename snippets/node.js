"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.node = void 0;
exports.node = {
    example: `\`\`\`javascript
  
    \`\`\``,
    multer: `\`\`\`javascript
//Multer config file

//   enctype="multipart/form-data" // Linea del formulario

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single('avatar');

module.exports = upload;\`\`\``,
};
