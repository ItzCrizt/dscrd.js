const { EmbedBuilder } = require('dscrd.js-14-beta')

module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    async execute(message, args) {
        const embed = new EmbedBuilder()
        .setDescription('Pong')
        await message.reply({ embeds: [embed] });
    },
};
