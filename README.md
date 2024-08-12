# dscrd.js

A beta version 14 of [dscrd.js](https://www.npmjs.com/package/dscrd.js?activeTab=readme). A package that can make your discord bot creation simple and easy.

## Documentaion

Coming SOON

## Updates

- Older Version Updates [0.1.1](https://www.npmjs.com/package/dscrd.js-14-beta/v/0.1.1)
- Added CommandsFolderDir - This makes your commands folder easy without using the command handler.

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
} = require('../../index');
// Removed fs
const path = require('path')

const client = new DscrdClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    prefix: '!',
    clientId: 'BOT_CLIENT_ID',
    token: 'BOT_TOKEN'
})

// Example 1: Load commands only from the ./commands directory (no subdirectories)
const absoluteDir = path.resolve(__dirname, './commands');
client.commandsFolderDir(absoluteDir, false) // ./commands

// Example 2: Load commands from the ./commands directory and its subdirectories
// const absoluteDir = path.resolve(__dirname, './commands');
// client.commandsFolderDir(absoluteDir, true); // ./commands/info and etc

client.handleMessage();
client.handleSlashCommands();

client.login(client.token)
    .then(() => client.registerSlashCommands())
    .catch(console.error);
```

## Info

If there is an issue running this or using the package, you can submit a issue [here](https://github.com/ItzCrizt/dscrd.js/issues)

## Others

As I said in [dscrd.js](https://www.npmjs.com/package/dscrd.js?activeTab=readme) I will update this package from time to time *now* because I might not update the __dscrd.js__ because its running the **v13** of discord. I will post the updated version of this package soon!# dscrd.js

A beta version 14 of [dscrd.js](https://www.npmjs.com/package/dscrd.js?activeTab=readme). A package that can make your discord bot creation simple and easy.

## Documentaion

Coming SOON

## Updates

- Older Version Updates [0.1.1](https://www.npmjs.com/package/dscrd.js-14-beta/v/0.1.1)
- Added CommandsFolderDir - This makes your commands folder easy without using the command handler.

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
} = require('../../index');
// Removed fs
const path = require('path')

const client = new DscrdClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    prefix: '!',
    clientId: 'BOT_CLIENT_ID',
    token: 'BOT_TOKEN'
})

// Example 1: Load commands only from the ./commands directory (no subdirectories)
const absoluteDir = path.resolve(__dirname, './commands');
client.commandsFolderDir(absoluteDir, false) // ./commands

// Example 2: Load commands from the ./commands directory and its subdirectories
// const absoluteDir = path.resolve(__dirname, './commands');
// client.commandsFolderDir(absoluteDir, true); // ./commands/info and etc

client.handleMessage();
client.handleSlashCommands();

client.login(client.token)
    .then(() => client.registerSlashCommands())
    .catch(console.error);
```

## Info

If there is an issue running this or using the package, you can submit a issue [here](https://github.com/ItzCrizt/dscrd.js/issues)

## Others

As I said in [dscrd.js](https://www.npmjs.com/package/dscrd.js?activeTab=readme) I will update this package from time to time *now* because I might not update the __dscrd.js__ because its running the **v13** of discord. I will post the updated version of this package soon!
