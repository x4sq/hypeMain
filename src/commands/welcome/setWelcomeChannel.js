const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../schema/welcomeChannel')

module.exports = {
    name: 'set-welcome-channel',
    timeout: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_ROLES')) return;

        const channel = message.mentions.channels.first();
        if(!channel) return message.reply('Please mention a channel.');

        Schema.findOne({ Guild: message.guild.id}, async(err, data) =>{
            if(data){
                data.Channel = channel.id;
                data.save();
            }else{
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                }).save();
            }
            message.reply(`${channel} has been successfully binded as welcome channel.`)
        })

    }
}