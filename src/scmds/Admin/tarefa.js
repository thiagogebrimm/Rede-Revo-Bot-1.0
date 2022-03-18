const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: 'tarefa',
    aliases: [''],
    categories: '',
    description: 'Agendar uma tarefa',
    usage: '',
    options: [
        {
            name: "staff",
            type: "USER",
            required: true,
            description: "Pra qual staff é a tarefa?"
        },
        {
            name: "tarefa",
            type: "STRING",
            required: true,
            description: "Qual é a tarefa?"
        },
    ],
    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(['MANAGE_MESSAGES'])) return interaction.editReply("Sem permissão para executar esse comando!");
        const member = interaction.options.getMember("staff")
        if (!member) {
            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setDescription(`Você deve mencionar um staff válido.`)
                    .setColor(`RED`)]
            });
        } else {
            let tarefa = interaction.options.getString("tarefa")
            if (!args[1]) tarefa = 'Nenhuma tarefa foi especificada.'
            else {
                tarefa = args.slice(1).join(' ');
            }

            interaction.editReply({
                embeds: [new MessageEmbed()
                    .setColor(`RED`)
                    .setDescription(`Tarefa adicionada!`)]
            });


            let TarefaEmbed = new MessageEmbed()
                .setAuthor({ text: `Solicitado por: ${interaction.user.tag}`, string: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`Nova Tarefa designada para você`)
                .setDescription(`${tarefa}`)
                .setFooter({ text: `Prioridade: EM BREVE`, string: interaction.guild.iconURL({ dynamic: true }) })
                .setColor(`#0000FF`);

            let button = new Discord.MessageButton()
                .setStyle('red')
                .setLabel('Marcar como concluida')
                .setCustomId('delete');

            const msg = await interaction.guild.channels.cache.find(x => x.id === '845490562290810891').send({
                components: `${member}`[new Discord.MessageActionRow().addComponents(button)],
                embeds: [TarefaEmbed],
            })
            member.send(msg.url, { embed: TarefaEmbed })
        }
    }
}