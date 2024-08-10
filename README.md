# dscrd.js

A beta version 14 of [dscrd.js](https://www.npmjs.com/package/dscrd.js?activeTab=readme). A package that can make your discord bot creation simple and easy.

## Documentaion

Coming SOON

## Updates

- Added GatewayDispatchEvents - For bot voice states and more.
- Added SlashCommandBuilder - Optional, but if you want to make a commands using that. You can now.
- Added Collection - Store comamnds in the commands folder, or aliases for the commands.
- Added/Fixed EmbedBuilder - Added more things that embed has.

## Deprecate

As of now, NONE

## Installation

```bash
npm i dscrd.js-14-beta@latest
```

## Usage

```js
const { 
    DscrdClient, 
    Collection, 
    EmbedBuilder, 
    GatewayIntentBits,
    SlashCommandBuilder
} = require('dscrd.js-14-beta');
const fs = require('fs');
const path = require('path');

const client = new DscrdClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    prefix: '!',
    clientId: 'BOT_CLIENT_ID'
})

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('ready')
})

/*******************************************************
*            COMMANDS FOLDER WITH COMMANDS             *
*******************************************************/

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(client.prefix) || message.author.bot) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        await message.reply({ content: 'There was an error while executing this command!' });
    }
})

client.addSlashCommand('ping', {
    name: 'ping',
    description: 'Replies with pong'
}, async (interaction) => {
    await interaction.reply('Pong')
    // If you want to have a slash command or you can use #SlashCommandBuilder instead
})

client.handleMessages(); // Still Optional if you want to put this
client.handleSlashCommands(); // Still Optional if you want to put this

client.login('BOT_TOKEN').then(() => {
    client.registerSlashCommands(); 
    // If you want to have a slash command or you can use #SlashCommandBuilder instead
});
```

## Info

If there is an issue running this or using the package, you can submit a issue [here](https://github.com/ItzCrizt/dscrd.js/issues)

## Others

As I said in [dscrd.js](https://www.npmjs.com/package/dscrd.js?activeTab=readme) I will update this package from time to time *now* because I might not update the __dscrd.js__ because its running the **v13** of discord. I will post the updated version of it soon!
