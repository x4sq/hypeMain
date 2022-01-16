const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear', 'delete'],
    timeout: 5000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return;

        const member = message.mentions.members.first();
        const messages = message.channel.messages.fetch();

        if(member){
            const userMessages = (await messages).filter((m)=> m.author.id === message.author.id);

            await message.channel.bulkDelete(userMessages);
            message.channel.send(`Deleted \`${userMessages}\` messages.`)
        } else {
            if(!args[0])
            return message.channel.send('Please specify a range of numbers to delete from 1-99.');
            if(isNaN(args[0]))
            return message.channel.send('Did not recieve a valid number.');
            if(parseInt(args[0]) > 99)
            return message.channel.send('The maximum amount of messages I can delete is 99.');

        
            await message.channel
            .bulkDelete(parseInt(args[0]) + 1)
            .catch((err) => console.log(err));
            message.channel.send(`Deleted \`${parseInt(args[0])}\` messages.`);
        }

    }
}