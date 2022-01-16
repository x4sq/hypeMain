const { MessageEmbed } = require('discord.js');
const client = require('../index');
const Discord = require('discord.js')
const db = require('../schema/Guild');
const user = require("../schema/Users");
client.on('messageCreate', async(message, client) => {
    const data = await db.findOne({ id: message.guild.id });

    if(!data) return; 
    if(message.author.bot) return;
    if(message.channel.id !== data.Channel) return;
    console.log()
    if(parseInt(message.content) === data.Current + 1) {
        console.log(data.Current + 2)
        const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setFooter('Hype')
        .setColor('GREEN')
        .setTitle('Correct number!')
        .setDescription(`Next number is: ${data.Current + 2}`)
        message.reply({ embeds: [embed] })
        user.findOne({ id: message.author.id, Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                data.Counts++;
            } else {
                data = new user({
                    id: message.author.id,
                    Guild: message.guild.id,
                    Counts: 1
                })
            }
            data.save();
        })


        data.Current = parseInt(message.content);
        data.save();
    } else message.delete();
} 
)