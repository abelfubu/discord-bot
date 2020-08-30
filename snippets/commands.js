"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const discord_js_1 = require("discord.js");
exports.commands = new discord_js_1.MessageEmbed()
    .setColor('#F2A359')
    .setTitle('Javascript')
    .setDescription('Code Snippets')
    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png')
    .addFields({
    name: '$angular',
    value: 'Angular code snippets',
}, {
    name: '$node',
    value: 'Node.js code snippets',
})
    .setTimestamp()
    .setFooter('Javascript code snippets');
