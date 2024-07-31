// WITH MOONLINK.JS
const { DscrdClient, Intents, EmbedBuilder } = require('dscrd.js');
const { Manager } = require("moonlink.js")

const client = new DscrdClient({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ],
    prefix: '!',
    clientId: 'YOUR_CLIENT_BOT_ID',
    // guildId: 'YOUR_GUILD_ID', // Optional if you want to work only in your server
});

client.moonlink = new Manager({
    nodes: [{
        identifier: "node_1",
        host: "lava-v4.ajieblogs.eu.org",
        port: 443,
        secure: true,
        password: "https://dsc.gg/ajidevserver"
      }],
    options: {
        // clientName: "MyApp/1.0.1"
      },
    sendPayload: (guildId, payload) => {
        const guild = client.client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(JSON.parse(payload));
      }
  })

client.on('ready', () => {
    console.log(`Logged in as ${client.client.user.tag}!`);
    client.moonlink.init(client.client.user.id);
});

client.on("raw", data => {
    // Updating the Moonlink.js package with the necessary data
    client.moonlink.packetUpdate(data);
});

client.moonlink.on("nodeCreate", node => {
    console.log(`${node.host} was connected, and the magic is in the air`);
});

client.moonlink.on("trackStart", async (player, track) => {
    // Sending a message when the track starts playing
    client.client.channels.cache
        .get(player.textChannelId)
        .send(`Now Playing ${track.title}`);
});

client.addCommand('ping', (message, args) => {
    const embed = new EmbedBuilder()
        .setTitle('Ping')
        .setDescription('Pong!')
        .setColor('#00FF00')
        .build();
    message.reply({ embeds: [embed] });
});

client.addCommand('play', async (message, args) => {
    if (!message.member.voice.channel) {
        message.reply('You are not in a voice channel')
    }
    let query = message.content
    let player = client.moonlink.createPlayer({
        guildId: message.guild.id,
        voiceChannelId: message.member.voice.channel.id,
        textChannelId: message.channel.id,
        autoPlay: false
    });
    if (!player.connected) {
        // Connecting to the voice channel if not already connected
        player.connect({
            setDeaf: true,
            setMute: false
        });
    }
    let res = await client.moonlink.search({
        query,
        source: "spotify",
        requester: interaction.user.id
    });

    if (res.loadType === "loadfailed") {
        return message.reply({
            content: `Load Failed`
        });
    } else if (res.loadType === "empty") {
        return message.reply({
            content: `No matches found!`
        });
    }
    if (res.loadType === "playlist") {
        messsage.reply({
            content: `Playlist: ${res.playlistInfo.name}`
        });
        for (const track of res.tracks) {
            // Adding tracks to the queue if it's a playlist
            player.queue.add(track);
        }
    } else {
        player.queue.add(res.tracks[0]);
        message.reply({
            content: `${res.tracks[0].title} added to queue`
        });
    }
    if (!player.playing) {
        // Starting playback if not already playing
        player.play();
    }
})

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