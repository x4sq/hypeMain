const client = require('../../src/index');
const path = require('path')
const { getCommands } = require('../utils')

client.on('ready', (message) => {
    console.log(`${client.user.tag} is now online!`);

    const arrayOfStatuses = [
        `over ${client.guilds.cache.size} servers!`, 
        `over ${client.channels.cache.size} channels!`,
        `over ${client.users.cache.size} members!`,
        `for >help`
    ];
    let index = 0;
    setInterval(() =>{
        if(index === arrayOfStatuses.length) index = 0;
        const status = arrayOfStatuses[index];
        client.user.setActivity(status, { type: 'WATCHING' });
        index++
    }, 10000)

    const clientDetails = {
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        channels: client.channels.cache.size
    }

    const express = require('express');

    const app = express();

    const port = 3000 || 3001;

    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    app.get("/", (req, res) => {
        res.status(200).sendFile(
            path.join(__dirname, "..","pages", "landingPage.html")
            );
    });

    app.get("/commands", (req, res)=> {
        const commands = getCommands();
        res.status(200).render('commands', { commands });
    })

    app.get("/info", (req, res)=>{
        res.status(200).send(clientDetails)
    })

    app.listen(port)
    console.log('Dashboard/website is now running.');

})