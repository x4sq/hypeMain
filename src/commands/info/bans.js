const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bans',
    description: 'Displays all banned members',
    timeout: 10000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.permissions.has('BAN_MEMBERS')) return;

        const fetchBans = message.guild.fetchBans();
        const bannedMembers = (await (await fetchBans).first(110))
        .map((member)=> member.user.tag)
        .join(", ");

        message.channel.send({ embeds: [bannedMembers] })

    }
}