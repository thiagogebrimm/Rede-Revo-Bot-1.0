const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'limites',
    aliases: [''],
    category: 'Minecraft',
    description: 'Mostra os limites do servidor',
    usage: '',

    run: async (client, interaction) => {
        const filter = (reaction, user) => {
            return ['⚙️', '🥚', '🔩'].includes(reaction.emoji.name) && !user.bot && user.id ===
                interaction.user.id;
        }
        const embed = new MessageEmbed()
            .setTitle(`Limites na Rede Revo`)
            .setColor(`#8B0000`)
            .setDescription(`Reaja abaixo com o emote correspondente ao limite que você deseja saber.`)
            .addField(`⚙️ Redstone`, `Aqui estarão os limites de redstone.`, true)
            .addField(`🥚 Mobs`, `Aqui estarão os limites de mobs.`)
            .addField(`🔩 Geradores`, `Aqui estarão os limites de geradores.`)
            .setFooter('A lista não é 100% fixa e pode ser editada a qualquer momento.', 'https://i.imgur.com/60A4TCX.gif');
        interaction.channel.send(embed).then(async msg => {
            await msg.react('⚙️') && await msg.react('🥚') && await msg.react('🔩')
            let collector = msg.createReactionCollector(filter);
            collector.on('collect', (reaction, user) => {
                msg.reactions.removeAll();
                embed.fields = [];
                const filter = (reaction, user) => {
                    return ['◀️'].includes(reaction.emoji.name) && !user.bot && user.id ===
                        interaction.user.id
                }
                let filc = msg.createReactionCollector(filter);
                msg.react('◀️')
                filc.on('collect', async () => {
                    const embed = new MessageEmbed()
                        .setTitle(`Limites na Rede Revo`)
                        .setColor(`#8B0000`)
                        .setDescription(`Reaja abaixo com o emote correspondente ao limite que você deseja saber.`)
                        .addField(`⚙️ Redstone`, `Aqui estarão os limites de redstone.`, true)
                        .addField(`🥚 Mobs`, `Aqui estarão os limites de mobs.`)
                        .addField(`🔩 Geradores`, `Aqui estarão os limites de geradores.`)
                        .setFooter('A lista não é 100% fixa e pode ser editada a qualquer momento.', 'https://i.imgur.com/60A4TCX.gif');
                    msg.edit(embed);
                    msg.reactions.cache.get('◀️').remove();
                    await msg.react('⚙️') && await msg.react('🥚') && await msg.react('🔩')
                })
                if (reaction.emoji.name === '⚙️') {
                    reaction.users.remove(user);
                    embed.setTitle(`<a:Check_Revo:845556618837098506> **Limites de Redstone** <a:Check_Revo:845556618837098506>`)
                    embed.setDescription(`<a:SetaDireita_Revo:847521645903872067> Limitado a 32 Redstones por chunk\n\n<a:SetaDireita_Revo:847521645903872067> Limitado a 16 Comparadores e Repetidores por chunk\n\n<a:SetaDireita_Revo:847521645903872067> Limitado a 16 Pistões por chunk\n\n<a:SetaDireita_Revo:847521645903872067> Limitado a 16 Observadores por chunk\n\n<a:SetaDireita_Revo:847521645903872067> Limitado a 16 Ejetores por chunk\n\n<a:SetaDireita_Revo:847521645903872067> Limitado a 16 Liberadores por chunk\n\n<a:SetaDireita_Revo:847521645903872067> Limitado a 8 Funis por chunk e 4 carrinhos com funil por 64 blocos`)
                    msg.edit(embed)
                } else if (reaction.emoji.name === '🥚') {
                    reaction.users.remove(user);
                    embed.setTitle(`<a:Check_Revo:845556618837098506> **Limites de Mobs** <a:Check_Revo:845556618837098506>`)
                    embed.setDescription(`<a:SetaDireita_Revo:847521645903872067> Limite de Aldeões: 8 a cada 30 blocos de distância\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Porcos, Vacas, Ovelhas, Galinhas e Cabras: 5 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Ursos, Raposas, Jaguatiricas, Coelhos, Andarilhos e Tartarugas: 4 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Peixes, Lulas, Axolots, e Golfinhos : 3 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Abelhas: 5 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Cachorros, Gatos e Papagaios: 4 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Cavalos, Mulas, Burros e Lhamas: 3 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Golens: 3 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Mobs Agressivos: 8 a cada 10 blocos\n\n<a:SetaDireita_Revo:847521645903872067> Limite de Withers: 2 a cada 20 blocos\n\n\n<:Esmeralda_Revo:847520945912414258> OBS: Caso o limite seja ultrapassado uma entidade aleatória ira desaparecer`)
                    msg.edit(embed);
                } else if (reaction.emoji.name === '🔩') {
                    reaction.users.remove(user);
                    embed.setTitle(`<a:Check_Revo:845556618837098506> **Limites de Geradores** <a:Check_Revo:845556618837098506>`)
                    embed.setDescription(`<a:SetaDireita_Revo:847521645903872067> Limitado a 2 Geradores por chunk`)
                    msg.edit(embed);
                }
            })
        })
    }
}