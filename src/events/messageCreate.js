
const client = require('../index');
const Discord = require('discord.js')
const Timeout = new Discord.Collection();
const prefix = client.prefix;
const ms = require('ms')


client.on('messageCreate', async message =>{
    const { Collection } = require('discord.js')
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
        if(command.timeout){
            if(Timeout.has(`${command.name}${message.author.id}`))return message.reply(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long: true})}\` cooldown.`)
            command.run(client, message, args);
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(()=> {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout
        )
        }
    };
});