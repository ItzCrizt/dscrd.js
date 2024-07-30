# dscoi.js

A simple and easy to use Discord bot library.

## Documentaion

Coming SOON

## Updates

- 1.2.2-beta - Fixed the slash commands. You can now use slash commands. Because the previous version, the slash commands don't work because it has no REST API

## Errors

- 1.2.1 - The slash commands don't work

## Installation

```bash
npm install dscoi.js
```

## Usage
```js
const { DscoiClient, Intents, EmbedBuilder } = require('./index');

const client = new DscoiClient({
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
