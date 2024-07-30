const { DscoiClient, Intents, EmbedBuilder } = require('./index');

const client = new DscoiClient({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
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
