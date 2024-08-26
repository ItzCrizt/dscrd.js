const { 
    Client, 
    GatewayIntentBits,
    GatewayDispatchEvents,
    Collection,
    SlashCommandBuilder 
} = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const EmbedBuilder = require('./contents/embedBuilder');
const fs = require('fs')
const path = require('path')

class DscrdClient extends Client {
    constructor(options) {
        super({ intents: options.intents });
        this.prefix = options.prefix || '!'; // Default Prefix
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.clientId = options.clientId;
        this.guildId = options.guildId || null; // Optional
        this.token = options.token;
        this.rest = new REST({ version: '10' }).setToken(this.token);
    }

    login(token) {
        this.token = token;
        this.rest.setToken(token);
        return super.login(token);
    }

    addCommand(command, callback) {
        this.commands.set(command, callback);
    }

    addSlashCommand(command, data, callback) {
        this.slashCommands.set(command, { data, callback });
    }

    handleMessage() {
        this.on('messageCreate', (message) => {
            if (!message.content.startsWith(this.prefix) || message.author.bot) return;
            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();

            if (this.commands.has(command)) {
                this.commands.get(command)(message, args);
            }
        });
    }

    handleSlashCommands() {
        this.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;

            const { commandName } = interaction;
            if (this.slashCommands.has(commandName)) {
                await this.slashCommands.get(commandName).callback(interaction);
            }
        });
    }

    async registerSlashCommands() {
        const commands = [];
        for (const [name, cmd] of this.slashCommands.entries()) {
            commands.push(cmd.data);
        }

        try {
            if (this.guildId) {
                await this.rest.put(
                    Routes.applicationGuildCommands(this.clientId, this.guildId),
                    { body: commands }
                );
                console.log('Successfully registered guild-specific application commands.');
            } else {
                await this.rest.put(
                    Routes.applicationCommands(this.clientId),
                    { body: commands }
                );
                console.log('Successfully registered global application commands.');
            }
        } catch (error) {
            console.error('Error registering commands:', error);
        }
    }

    commandsFolderDir(dir, useSubdirectories = false) {    
        // Check if the directory exists
        if (!fs.existsSync(dir)) {
            console.error(`Error: Directory ${dir} does not exist.`);
            return;
        }
        const loadCommands = (directory) => {
            const commandFiles = fs.readdirSync(directory);
            for (const file of commandFiles) {
                const fullPath = path.join(directory, file);
                const stat = fs.lstatSync(fullPath);
    
                if (stat.isDirectory() && useSubdirectories) {
                    loadCommands(fullPath); // Recursively load commands from subdirectories
                } else if (file.endsWith('.js')) {
                    const command = require(fullPath);
                    if (command.data && command.execute) {
                        this.addSlashCommand(command.data.name, command.data, command.execute);
                    } else if (command.name && command.execute) {
                        this.addCommand(command.name, command.execute);
                    }
                }
            }
        };
    
        loadCommands(dir);
    }
}

module.exports = { 
    DscrdClient, 
    GatewayIntentBits, 
    EmbedBuilder,
    GatewayDispatchEvents,
    Collection,
    SlashCommandBuilder
};
