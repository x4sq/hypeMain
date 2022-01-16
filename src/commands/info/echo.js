const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
module.exports = {
    ...new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Makes Hype echo the message you insert')
    .addStringOption((option) => 
        option
        .setName('message')
    .setDescription('The message you want Hype to echo')
    ),

    run: async(client, interaction, args) => {
        interaction.followUp({ content: 'hello worlds'});
    }
}