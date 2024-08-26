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