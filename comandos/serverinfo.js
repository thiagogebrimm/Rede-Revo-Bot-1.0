const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'Sem Cargo',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'None',
    LOW: 'Baixo',
    MEDIUM: 'Médio',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
    brazil: 'Brasil',
    europe: 'Europa',
    hongkong: 'Hong Kong',
    india: 'Índia',
    japan: 'Japão',
    russia: 'Russia',
    singapore: 'Singapura',
    southafrica: 'África do Sul',
    sydney: 'Sydney',
    'us-central': 'Centro dos EUA',
    'us-east': 'Leste dos EUA',
    'us-west': 'Oeste dos EUA',
    'us-south': 'Sul dos EUA'
};

module.exports.run = async (bot, message, args) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const emojis = message.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`**Informações do Servidor**`)
            .setColor('BLACK')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('Geral:', [
                `**Nome:** \`${message.guild.name}\``,
                `**ID:** \`${message.guild.id}\``,
                `**Dono:** \`${message.guild.owner.user.tag} (${message.guild.ownerID})\``,
                `**Região:** \`${regions[message.guild.region]}\``,
                `**Nível de Boost:** \`${message.guild.premiumTier ? `Nível ${message.guild.premiumTier}\`` : 'None'}`,
                `**Level de Verificação:** \`${verificationLevels[message.guild.verificationLevel]}\``,
                `**Criado em:** \`${moment(message.guild.createdTimestamp).format('LL')}\` ás \`${moment(message.guild.createdTimestamp).format('LT')}\` \`[${moment(message.guild.createdTimestamp).fromNow()}]\``,
                '\u200b'
            ])
            .addField('Estatístico:', [
                `**Número de Cargos:** \`${roles.length}\``,
                `**Número de Emojis:** \`${emojis.size}\``,
                `**Número de Emojis Regulares:** \`${emojis.filter(emoji => !emoji.animated).size}\``,
                `**Número de Emojis Animados:** \`${emojis.filter(emoji => emoji.animated).size}\``,
                `**Número de Membros:** \`${message.guild.memberCount}\``,
                `**Humanos:** \`${members.filter(member => !member.user.bot).size}\``,
                `**Bots:** \`${members.filter(member => member.user.bot).size}\``,
                `**Canais de Texto:** \`${channels.filter(channel => channel.type === 'text').size}\``,
                `**Canais de Voz:** \`${channels.filter(channel => channel.type === 'voice').size}\``,
                `**Número de Boosts:** \`${message.guild.premiumSubscriptionCount || '0'}\``,
                '\u200b'
            ])
            .addField('Membros:', [
                `**Online:** \`${members.filter(member => member.presence.status === 'online').size}\``,
                `**Ocupados:** \`${members.filter(member => member.presence.status === 'dnd').size}\``,
                `**Ausentes:** \`${members.filter(member => member.presence.status === 'idle').size}\``,
                `**Offline:** \`${members.filter(member => member.presence.status === 'offline').size}\``,
                '\u200b'
            ])
    
            .setTimestamp();
        message.channel.send(embed);
    }

module.exports.help = {
    name: 'serverinfo',
    description: 'Retorna as informações acessíveis sobre o servidor.',
    category: 'Utilities'
}

module.exports.requirements = {
    ownerOnly: false
}

module.exports.limits = {
    ratelimit: 3,
    cooldown: 1e2
}