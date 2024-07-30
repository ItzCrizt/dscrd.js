const { DscoiClient, Intents, EmbedBuilder } = require('dscoi.js');

const client = new DscoiClient({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ],
    prefix: '!'
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

client.addSlashCommand('hello', async (interaction) => {
    const embed = new EmbedBuilder()
        .setTitle('Hello')
        .setDescription('Hello, world!')
        .setColor('#00FF00')
        .build();
    await interaction.reply({ embeds: [embed] });
});

client.handleMessages();
client.handleSlashCommands();

client.login();