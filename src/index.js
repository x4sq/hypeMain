const { Collection } = require('discord.js');
const schema = require('./schema/economy')
const mongoose  = require('mongoose')

const path = require('path')
const Client = require('discord.js')
const fs = require('fs')
require('dotenv').config()
const Discord = require('discord.js')
//const config = require('./config.json');
const client = new Discord.Client({ disableEveryone: true, partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384],})
module.exports = client;
client.commands = new Collection();
client.slashCommands = new Collection();
client.prefix = process.env.PREFIX;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 


process.on("unhandledRejection", (reason, p) => {
    console.log(" [antiCrash] :: Unhandled Rejection/Catch");
    console.log(reason, p);
});
process.on("uncaughtException", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch");
    console.log(err, origin);
});
process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log(" [antiCrash] :: Uncaught Exception/Catch (MONITOR)");
    console.log(err, origin);
});
process.on("multipleResolves", (type, promise, reason) => {
    console.log(" [antiCrash] :: Multiple Resolves");
    console.log(type, promise, reason);
});

mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log('Connected to MongoDB database successfully.')
}).catch((err)=>{
    console.log(err);
})

client.bal = (id) => new Promise(async ful => {
    const data = await schema.findOne({ id });
    if(!data) return ful(0);
    ful(data.doubloons)
})

client.add = (id, doubloons) =>{
    schema.findOne({ id }, async(err, data)=>{
        if(err) throw err;
        if(data){
            data.doubloons += doubloons;
        } else {
            data = new schema({ id, doubloons })
        }
        data.save();
    })
}
client.rmv = (id, doubloons) =>{
        schema.findOne({ id }, async(err, data)=>{
        if(err) throw err;
        if(data){
            data.doubloons -= doubloons;
        } else {
            data = new schema({ id, doubloons: -doubloons })
        }
        data.save();
    })
}

client.login(process.env.TOKEN);