const { Client, Message, MessageEmbed } = require('discord.js');
const inventory = require('../../schema/inventory');
const items = require('../../shopItems');


module.exports = {
    name: 'buy',
    timeout: 4000,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please specify an item to buy. Run >shop to view available items.');
        const itemToBuy = args[0].toLowerCase();

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.reply('The item you specified is invalid. Run >shop to view available items.');

        const itemPrice = items.find((val) => (val.item.toLowerCase()) === itemToBuy).price;

        const userBalance = await client.bal(message.author.id);
        if(userBalance < itemPrice) return message.reply(`You only have ${userBalance} doubloons, the price of the item you wish to buy is ${itemPrice} doubloons.`);

        const params = {
            Guild: message.guild.id,
            User: message.author.id
        }
        inventory.findOne(params, async(err, data) => {
            if(data){
                const hasItem = Object.keys(data.Inventory).includes(itemToBuy);
                if(!hasItem){
                    data.Inventory[itemToBuy] = 1;
                } else {
                    data.Inventory[itemToBuy]++;
                }
                console.log(data);
                await inventory.findOneAndUpdate(params, data);
            } else {
                new inventory({
                    Guild: message.guild.id,
                    User: message.author.id,
                    Inventory: {
                        [itemToBuy]: 1
                    }
                }).save();

            }
            message.reply(`You have successfully purchased ${itemToBuy} for ${itemPrice} doubloons.`);
            client.rmv(message.author.id, itemPrice);
        }
        
        )


    }
}