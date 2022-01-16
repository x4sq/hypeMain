const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const canvas = require('discord-canvas');
const Schema = require('../../schema/welcomeChannel');
module.exports = {
    name: 'canvas',
    timeout: 15000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const guild = member;

        const image = await new canvas.Goodbye()
  .setUsername("xixi52")
  .setDiscriminator("0001")
  .setMemberCount("140")
  .setGuildName("Server DEV")
  .setAvatar(message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
  .setColor("border", "#8015EA")
  .setColor("username-box", "#8015EA")
  .setColor("discriminator-box", "#8015EA")
  .setColor("message-box", "#8015EA")
  .setColor("title", "#8015EA")
  .setColor("avatar", "#8015EA")
  .setBackground("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v462-n-130-textureidea_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=9465282a2b0a375f4f5b120d7bbad882")
  .toAttachment();
 
 await message.channel.send({ content: `Welcome <@${message.author.id}>! Have fun in ${guild.name}`, files: [new MessageAttachment(image.toBuffer(),"goodbye-image.png")]});
    },
}