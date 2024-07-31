# dscrd.js

A updated version of a deleted package \"dscoi.js\" and A simple and easy to use package to create a discord bot.

## Documentaion

Coming SOON

## Updates

- 1.2.5 / 1.2.7 - Fixed the slash commands. You can now use slash commands. Because the previous version, the slash commands don't work because it has no REST API

- Updated version of the deleted package "dscoi.js"

## Deprecate

- 1.2.7-beta - Removed GatewayDispatchEvents

- "dscoi.js" -  Deleted

## Installation

```bash
npm install dscrd.js
```

## Usage
```js
const { DscrdClient, Intents, EmbedBuilder } = require('dscrd.js');

const client = new DscrdClient({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ],
    prefix: '!',
    clientId: 'YOUR_CLIENT_BOT_ID',
    // guildId: 'YOUR_GUILD_ID', // Optional if you want to work only in your server
});

client.on('ready', () => {
    console.log(`Logged in as ${client.client.user.tag}!`);
});

client.addCommand('ping', (message, args) => {
    const embed = new EmbedBuilder()
        .setTitle('Ping')
        .setDescription('Pong!')
        .setColor('#00FF00')
        .build();
    message.reply({ embeds: [embed] });
});

client.addSlashCommand('hello', {
    name: 'hello',
    description: 'Replies with Hello, world!'
}, async (interaction) => {
    const embed = new EmbedBuilder()
        .setTitle('Hello')
        .setDescription('Hello, world!')
        .setColor('#00FF00')
        .build();
    await interaction.reply({ embeds: [embed] });
});

client.handleMessages();
client.handleSlashCommands();

client.login('YOUR_BOT_TOKEN').then(() => {
    client.registerSlashCommands();
});
```

## Others
I will update this npm time to time ( maybe since its my first time to publish one ) This version might be running a v13 of discord. I will post the updated version of it soon! 
