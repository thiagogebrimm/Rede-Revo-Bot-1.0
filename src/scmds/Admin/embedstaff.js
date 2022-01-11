const { MessageEmbed } = require('discord.js');


module.exports = {
  name: 'embedstaff',
  aliases: [''],
  category: 'Admin',
  description: 'Gera o embed para o guia da Staff',
  usage: '',

  run: async (bot, interaction, message) => {
    if (!interaction.member.permissions.has(['ADMINISTRATOR'])) return interaction.editReply("Sem permissão para executar esse comando!");

    let embedStaff = new MessageEmbed()
      .setTitle(`Oi se você está vendo este canal ficamos felizes que você faz parte da nossa equipe <:Cora_Revo:846044959105613854>.  Aqui vai algumas instruções e comandos úteis para a staff.`)
      .setURL('https://chat.whatsapp.com/CpZKtgfVU94HloorR8DTeK')
      .setDescription(`\u200B
**Sobre a conduta**
A partir de agora você é representante do servidor e suas ações dentro e fora do servidor influenciam diretamente na nossa image, então não toleramos nenhum tipo de baixo calão em tratamento com jogadores em qualquer um dos meios de comunicação e pedimos sempre o máximo de formalidade possível.

**Regras Gerais da Staff**
• Não dê Punições Incorretas (MOTIVO INCORRETO, SEM PROVAS). \`[-1 ponto]\`
• Não quebre nenhuma regra, o peso das regras é muito maior sobre vocês. \`[Ponto vária de acordo com a gravidade]\`
• Não fique ausente por mais de 5 dias sem aviso prévio. \`[-1 ponto por dia offline após os 5 dias]\`
• Nunca se recuse à ajudar players nos chats. (Sim vão ter carentes que vão ver você com cargo e ficar fazendo pergunta óbvia, desvie do assunto e não se estresse isso é bem comum)  \`[-1 ponto]\`
• Nunca compartilhe sua conta com outro jogador \`[-5 pontos]\`

**Ajudantes / Construtores**
Vocês são jogadores/staff porém tenham em mente que não, vocês não tem algum tipo de vantagem em qualquer coisa relacionada a jogabilidade dentro do servidor, e não vocês não podem solicitar informações extras de outros jogadores sejam desde coordenadas, prints da tela ou até mesmo anydesk etc...
• Não leve jogadores junto com você ao atendimento \`[-1 ponto]\` Exclusivo ajudantes
• Atraso na entrega de construções sem uma justificativa \`[-1 ponto p/ dia de atraso]\` Exclusivo construtores

**Punições** <a:Banido_Revo:846044959399477268> 
Para punições de grau "leve" sempre tente alertar o jogador em sua primeira incidência como por exemplo o jogador manda repetidas vezes "Alguém vende semente de trigo?" e você já chega e muta de primeira sem nimguem reclamar sobre, então em casos mais leves opte sempre por alertar o jogador antes de punir.

\`\`\`🛑 ATENÇÃO Para toda punição é necessário ter prova, qualquer punição sem prova será automaticamente anulada (segue abaixo um tutorial de como obter prints/gravações para as provas).\`\`\`

Segue o modelo de punições:
• Punições devem seguir o mesmo padrão de escrita do tópico do site, jogador floodou você pune por **Desordem no chat** etc... 
• Logo após aplicar a punição, ela irá aparecer no <#849452824970264626> e lá você anexa a prova referente aquela punição. Utilize o botão "responder" do próprio discord pra ficar mais organizado, o  tempo máximo de tolêrancia pra adição de provas é de 15 minutos para prints e 30 minutos para vídeos.
`)
      .setColor(`#B90000`)

    let embedMods = new MessageEmbed()
      .setDescription(`
**Moderadores+** \`(Só precisa ler aqui se você virou moderador(a))\`
Qualquer cargo acima de moderador é estritamente proibido que jogue ou influencie a jogabilidade dos jogadores no servidor, qualquer reporte sobre este tipo de caso poderá acarretar em desligamento da equipe.
• Evitem demonstrar relações extras com jogadores, essa é uma questão que da muito problema no sentido de falarem que staff passa pano, abuser, etc...
• Reportes do anticheat que indicam entre 29~30 cps geralmente são jogadores utilizando tecla
Em caso de jogadores com clientes alternativos ou qualquer coisa nesse sentido, opte sempre por tentar convencer o jogador a admitir o uso utilize os seguintes recursos pra tentar forçar admitir:
- Entra na mente falando que já tem tudo gravado e diga que se ele admitir é muito mais facil ja que não tem pra onde correr
- Oferecer 7 dias de banimento falando que se ele admitir ali ele toma um ban temporario e vai ter a chance de voltar legit depois de 7 dias
- Diz que o banimento dele ninguém vai saber e será somente entre vocês 2 e utilizara um ban silencioso
**Observações:**
- Banimentos para este tipo de caso de sempre prioridade a vídeos como prova para evitar problemas futuros como falar que a print foi tirada com ele caindo ou algo do genero.
- Sempre espere o jogador se movimentar pra intimar, evitando que ele se finja afk, viu movimento (consegue provar que ele se movimentou) deu 3 chamados e ele não respondeu? Banimento permanente por negar tela.
    `)
      .setColor(`#B90000`)


    let embedRecompensas = new MessageEmbed()
      .setTitle(`<:Cora_Revo:846044959105613854> Sistema de recompensas <:Cora_Revo:846044959105613854>`)
      .setDescription(`
Como forma de agradecimento criamos este sistema para premiar vocês de acordo com a conduta, segue o modelo:

**Ajudantes**
Para ajudantes exemplares: **4000** cash
**8** pontos - **3500** cash
**6** pontos - **2500** cash
**5** pontos - **1500** cash


**Construtores**
Para construtores exemplares: **4000**
**8** pontos - **3500** cash
**6** pontos - **2500** cash
**5** pontos - **1500** cash

\`\`\`Lembrando que nenhum staff tem delay de teleporte, delay em nenhum chat, entra com servidor lotado, tem prioridade no tab, fora as permissões exclusivas dos cargos:
Ajudantes: Tell destacado
Construtores: Fly liberado em terrenos sem precisar ter VIP, servidor dedicado exclusivo com todos recursos necessários pra construções\`\`\`
`)
      .setColor(`#B90000`)


    let embedComandos = new MessageEmbed()
      .setTitle(`Comandos <:Help_Revo:849393026961899520>`)
      .setDescription(`
<@&793282814040604672>:
Mutar - \`/muteip (nick) (tempo) (motivo)\`
Visualizar as punições mais facilmente dentro do jogo - /regrasstaff

<@&793282783672795147>, <@&793282716073984000> e <@&793608100221026314>:
No Lobby: \`/dupeip\` <:SetaAzul_Revo:845829681450188881> \`/verificar\` <:SetaAzul_Revo:845829681450188881> \`/nlogin register <nick> <senha>\`
Segue o padrão: Registra para o jogador com a senha **rederevo** e instrui ele a como mudar a senha com \`/mudarsenha\` os outros comandos são pra ver se o jogador está com conta fake e saber mais informações da conta.
    `)
      .setColor(`#B90000`)


    let embedPrints = new MessageEmbed()
      .setTitle(`Tutorial lightshot 📷`)
      .setDescription(`
Site para baixar: https://app.prntscr.com/pt-br/download.html

Viu alguém quebrando alguma regra? Aperte o botão de print screen e vai aparecer um selecionador, selecione a área que quer printar como na imagem abaixo e assim que upar a print só vai aparecer a parte que você selecionou
    `)
      .setColor(`#B90000`)
      .setImage('https://media.discordapp.net/attachments/795887543714840576/856531909734301727/unknown.png')


    let embedGravar = new MessageEmbed()
      .setTitle(`Tutorial gravações 🎥`)
      .setDescription(`
APPs de gravação
- Possui placa de vídeo Nvidea? Recomendamos utilizar **repetição instantanea**
- Não possui? Recomendamos OBS

Site para upar o vídeo e transformar em link: https://streamable.com/
    `)
      .setColor(`#B90000`)


    interaction.deleteReply()
    interaction.channel.send({
      embeds: [embedStaff, embedMods, embedComandos, embedPrints, embedGravar]
    })
    await interaction.channel.send({
      embeds: [embedRecompensas]
    })
  }
}