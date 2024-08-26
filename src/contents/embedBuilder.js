const { EmbedBuilder: DiscordEmbedBuilder } = require('discord.js');

class EmbedBuilder {
    constructor() {
        this.embed = new DiscordEmbedBuilder();
    }

    setAuthor(name, iconURL) {
        this.embed.setAuthor({ name, iconURL });
        return this;
    }

    setTitle(title) {
        this.embed.setTitle(title);
        return this;
    }

    setDescription(description) {
        this.embed.setDescription(description);
        return this;
    }

    setColor(color) {
        this.embed.setColor(color);
        return this;
    }

    addFields(name, value, inline = false) {
        this.embed.addFields({ name, value, inline });
        return this;
    }

    setImage(image) {
        this.embed.setImage(image);
        return this;
    }

    setThumbnail(thumbnail) {
        this.embed.setThumbnail(thumbnail);
        return this;
    }

    setTimestamp(timestamp = new Date()) {
        this.embed.setTimestamp(timestamp);
        return this;

    }

    setURL(url) {
        this.embed.setURL(url);
        return this;
    }

    setFooter(text, iconURL) {
        this.embed.setFooter({ text, iconURL });
        return this;
    }

    build() {
        return this.embed;
    }
}

module.exports = EmbedBuilder