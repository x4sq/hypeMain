const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require('../../schema/inventory');

module.exports = {
    name: 'inventory',
    aliases: ['inv'],
    timeout: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        inventory.findOne(
            { Guild: message.guild.id, User: message.author.id },
             async(err, data) => {
            if(!data) return message.channel.send('Your inventory is empty.');
            const mappedData = Object.keys(data.Inventory).map((key)=>{
                return `${key}(${data.Inventory[key]})`
            }).join("\n");
            message.channel.send(mappedData)
        });

    }
}