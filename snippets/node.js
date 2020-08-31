"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.node = exports.nodeSnippets = void 0;
const discord_js_1 = require("discord.js");
const helpMsg = new discord_js_1.MessageEmbed()
    .setColor('#79b462')
    .setTitle('Node.js')
    .setURL('https://nodejs.org/en/')
    .setDescription('Node code snippets')
    .setThumbnail('https://usefulangle.com/img/thumb/nodejs.png')
    .addFields({ name: '$node cors', value: 'https://www.npmjs.com/package/cors' }, { name: '$node dotenv', value: 'https://www.npmjs.com/package/dotenv' }, { name: '$node jwt', value: 'https://www.npmjs.com/package/jsonwebtoken' }, { name: '$node multer', value: 'https://www.npmjs.com/package/multer' }, { name: '$node mysql', value: 'https://www.npmjs.com/package/mysql' })
    .setTimestamp()
    .setFooter('Javascript code snippets');
exports.nodeSnippets = (snippet) => {
    switch (snippet) {
        case 'multer':
            return exports.node.multer;
        case 'mysql':
            return exports.node.mysql;
        case 'jwt':
            return exports.node.jwt;
        case 'dotenv':
            return exports.node.dotenv;
        case 'cors':
            return exports.node.cors;
        default:
            return helpMsg;
    }
};
exports.node = {
    example: `\`\`\`javascript
  
    \`\`\``,
    cors: `\`\`\`javascript
const cors = require('cors');

app.use(cors());\`\`\``,
    dotenv: `\`\`\`javascript
require('dotenv').config();\`\`\``,
    jwt: `\`\`\`javascript
//Create token in login
const token = jwt.sign({user: user}, 'secret', {expiresIn: '1h'});

//Middleware example
const jwt = require('jsonwebtoken');

module.exports = verify = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) res.json({ auth: 'Invalid token ...' });
      req.body.user = decoded;
    });
    next();
  } else res.json({ auth: 'Please login first ...' });
};\`\`\``,
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
    mysql: `\`\`\`javascript
const mysql      = require('mysql');
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'me',
	password : 'secret',
	database : 'my_db'
});
 
connection.connect();

module.exports = connection;\`\`\``,
};
