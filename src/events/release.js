const client = require('../../src/index');

client.on('messageCreate', (message) => {
    if(message.author.bot) return;
    let messageContent = message.content
    const msgreply = 'DUALITY has no confirmed release date. Please see <#850479152275783701> for further information.'
    

    if(messageContent.includes('release')) return message.reply(msgreply);

;
})