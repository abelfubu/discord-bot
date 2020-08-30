"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const discord_js_1 = require("discord.js");
const angular_1 = require("./snippets/angular");
const node_1 = require("./snippets/node");
const commands_1 = require("./snippets/commands");
dotenv_1.default.config();
const client = new discord_js_1.Client();
const PREFIX = '$';
client.login(process.env.DISCORDJS_BOT_TOKEN);
client
    .on('ready', () => console.log('Successfully logged in!'))
    .on('guildMemberAdd', member => {
    member
        .send(`Bienvenido ${member.user} a nuestro canal de discord!`)
        .catch(console.error);
})
    .on('message', message => {
    const msg = message.content.toLowerCase();
    if (message.author.bot)
        return;
    if (msg.includes('hola'))
        message.channel.send(`Hola ${message.author}!`);
    if (msg.includes('javascript'))
        message.react('742639748711055390');
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        switch (CMD_NAME) {
            case 'help':
                message.channel.send(commands_1.commands.help);
            case 'node':
                message.channel.send(node_1.nodeSnippets(args[0]));
            case 'angular':
                message.channel.send(angular_1.angularSnippets(args[0]));
        }
    }
});
