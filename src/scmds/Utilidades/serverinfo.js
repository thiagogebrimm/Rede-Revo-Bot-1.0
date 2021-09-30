const moment = require('moment');

const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'Sem Cargo',
    ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
    NONE: 'Nenhum',
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

        
const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'serverinfo',
    aliases: [''],
    categories : '',
    description: 'Veja as info deste servidor.',
    usage: '',
     /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
      run: async(client, interaction, args) => {
        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = interaction.guild.members.cache;
        const channels = interaction.guild.channels.cache;
        const emojis = interaction.guild.emojis.cache;

        const embed = new MessageEmbed()
            .setDescription(`**Informações do Servidor**`)
            .setColor('BLACK')
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .addField('Geral:', [
                `**Nome:** \`${interaction.guild.name}\``,
                `**ID:** \`${interaction.guild.id}\``,
                `**Dono:** \`${interaction.guild.owner.user.tag} (${interaction.guild.ownerID})\``,
                `**Região:** \`${regions[interaction.guild.region]}\``,
                `**Nível de Boost:** \`${interaction.guild.premiumTier ? `Nível ${interaction.guild.premiumTier}\`` : 'Nenhum'}`,
                `**Level de Verificação:** \`${verificationLevels[interaction.guild.verificationLevel]}\``,
                `**Criado em:** \`${moment(interaction.guild.createdTimestamp).format('LL')}\` ás \`${moment(interaction.guild.createdTimestamp).format('LT')}\` \`[${moment(interaction.guild.createdTimestamp).fromNow()}]\``,
                '\u200b'
            ])
            .addField('Estatístico:', [
                `**Número de Cargos:** \`${roles.length}\``,
                `**Número de Emojis:** \`${emojis.size}\``,
                `**Número de Emojis Regulares:** \`${emojis.filter(emoji => !emoji.animated).size}\``,
                `**Número de Emojis Animados:** \`${emojis.filter(emoji => emoji.animated).size}\``,
                `**Número de Membros:** \`${interaction.guild.memberCount}\``,
                `**Humanos:** \`${members.filter(member => !member.user.bot).size}\``,
                `**Bots:** \`${members.filter(member => member.user.bot).size}\``,
                `**Canais de Texto:** \`${channels.filter(channel => channel.type === 'text').size}\``,
                `**Canais de Voz:** \`${channels.filter(channel => channel.type === 'voice').size}\``,
                `**Número de Boosts:** \`${interaction.guild.premiumSubscriptionCount || '0'}\``,
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
        interaction.editReply({
            embeds: [embed]
        });
      }
    }