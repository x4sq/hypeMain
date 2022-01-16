const { CommandInteraction, Client } = require('discord.js');

module.exports = {
    name: 'test', 
    description: 'test',

    run: async(client, interaction, args) => {
        interaction.editReply({ content: 'hi'})

    }
}