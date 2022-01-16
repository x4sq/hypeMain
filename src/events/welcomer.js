const client = require('../index');
const Schema = require('../schema/welcomeChannel');
const canvas = require('discord-canvas');
const Discord = require('discord.js');
const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
client.on('guildMemberAdd', async(member) =>{
    Schema.findOne({ Guild: member.guild.id}, async (e, data) =>{
        const guild = member;
        if(!data) return;
        const user = member.user;
        const image = await new canvas.Welcome()
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(user.displayAvatarURL({ format: 'png' }))
        .setColor("border", "#8015EA")
        .setColor("username-box", "#8015EA")
        .setColor("discriminator-box", "#8015EA")
        .setColor("message-box", "#8015EA")
        .setColor("title", "#8015EA")
        .setColor("avatar", "#8015EA")
        .setBackground("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v462-n-130-textureidea_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=9465282a2b0a375f4f5b120d7bbad882")
        .toAttachment();

             const channel = member.guild.channels.cache.get(data.Channel);
             channel.send({ content: `Welcome <@${member.user.id}>! Have fun in Hytrix Studio!`, files: [new Discord.MessageAttachment(image.toBuffer(),"welcome-image.png")]});
    })
})