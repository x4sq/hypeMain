const { Client, Message, MessageEmbed, Collection, Discord } = require('discord.js');

module.exports = {
    name: 'economy-leaderboard',
    aliases: ['el', 'econ-leaderboard'],
    timeout: 15000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const collection = new Collection();

        const msg = await message.channel.send('Loading economy leaderboard.... This will take a while..');


        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const bal = await client.bal(id);
                console.log(`${member.user.tag} -> ${bal}`)
                return bal !== 0 ? collection.set(id, {
                    id, 
                    bal,
                })
                : null
            })
        );
        const data = collection.sort((a, b) => b.bal - a.bal).first(5);

        const leaderboardEmbed = new MessageEmbed()
        .setTitle('Leaderboard in '+ message.guild.name)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor('#ffab44')
        .setDescription(
            data.map((v, i) =>{
                return `${i+1}) ${client.users.cache.get(v.id)} => ${v.bal} doubloons`
            })
        )
        message.channel.send({embeds: [leaderboardEmbed] })
        msg.delete()
        console.log('Sent econ leaderboard and deleted loading message')
    }
}