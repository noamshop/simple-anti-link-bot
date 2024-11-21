const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const config = require('./config.json');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


client.on('ready', () => {
    console.log('Bot has started!');
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const urlPattern = /(https?:\/\/[^\s]+)/g;

    if (message.guild) {
        const member = message.guild.members.cache.get(message.author.id);
        if (member && member.roles.cache.has(config.allowedRoleId)) {
            return;
        }
    }

    const foundUrls = message.content.match(urlPattern);
    if (foundUrls) {
        message.delete();

        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription('⚠️You cannot send links here!⚠️')
            .setTimestamp();

        const sentMessage = await message.channel.send({ embeds: [embed] });

        setTimeout(() => {
            sentMessage.delete().catch(console.error);
        }, 5000);
    }
});


client.login('token here');
