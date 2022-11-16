const { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const { createTranscript}= require("discord-html-transcripts")
const { Config } = require("../../forma/config")
const db = require("megadb")
const canal = new db.crearDB("tickets")
module.exports = {
  name: 'interactionCreate',
  async execute(client, EmbedBuilder, BaseInteraction) {

    const catego = Config.Channels.Categoria
    const Logs = Config.Channels.Logs
    const mod = Config.Staff.Mod
    const srv = client.guilds.cache.get("726606076509683755") //* Aqui pones el ID del servidor
    const everyone = srv.roles.cache.find(r => r.name === "@everyone")


    if (BaseInteraction.isButton()) {


      function CreateChannel(tipo) {
        srv.channels.create({
          name: `Ticket ${tipo} de ${BaseInteraction.user.username}`,
          type: ChannelType.GuildText,
          parent: catego,
          permissionOverwrites: [{
            id: mod,
            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory]

          }, {
            id: everyone,
            deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ReadMessageHistory]
          }]


        }).then(async c => {
          const b = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setLabel("Cerrar")
                .setStyle("Danger")
                .setCustomId("Close")
                .setEmoji("❌")
            )

          const msg = new EmbedBuilder()
            .setTitle("Ticket creado |🎟️")
            .setDescription(`Hola <@${BaseInteraction.user.id}>,ah creado un ticket mediante el metodo mod mail, escribe aqui para responderle`)
            .setColor("#082894")
            .setTimestamp()
            .setFooter({ text: `Sistema de tickets` })

          c.send({ content: ` <@&${mod}> `, embeds: [msg], components: [b] })

          

          canal.set(`${BaseInteraction.user.id}`, { Canal: c.id, User: BaseInteraction.user.id,Md: BaseInteraction.channel.id})



        })
        BaseInteraction.reply({ content: `El ticket se creó correctamente, espera a que un mod te responda por este MD `, ephemeral: true })

        const log = new EmbedBuilder()
          .setTitle("Ticket Creado ")
          .setDescription(`El usuario <@${BaseInteraction.user.username}> ah creado un ticket de tipo ${tipo}`)
          .setColor("Green")
        client.channels.cache.get(Logs).send({ embeds: [log] })

      }
      const o = ["Close","cerrar"]
      if (canal.has(`${BaseInteraction.user.id}`) && !o.includes(BaseInteraction.customId)) {
        return BaseInteraction.reply({ content: "Ya tienes un ticket creado, cierra el actual para abrir otro", ephemeral: true })
      } else if (!canal.has(`${BaseInteraction.user.id}`) && BaseInteraction.customId == "cerrar") {
        return BaseInteraction.reply({ content: "No tienes ningún ticket abierto", ephemeral: true })
      }
      switch (BaseInteraction.customId) {
        case "charla":
          CreateChannel("Charla staff")
          break;

        case "sup":
          CreateChannel("Soporte")
          break;

        case "help":
          CreateChannel("Ayuda")
          break;

        case "rep":
          CreateChannel("Reporte")
          break;

        case "cerrar":
          let usario = await canal.get(`${BaseInteraction.user.id}.User`)
          let canalito = await canal.get(`${BaseInteraction.user.id}.Canal`)
          let usuarioo = client.users.cache.get(usario)
          const cnl = client.channels.cache.get(canalito)
          const transcripte = await createTranscript(cnl,{
            limit: -1,
            returnBuffer:false,
            fileName: `Ticket.html`,

          })
          usuarioo.send({ content: "Tu ticket ah sido cerrado",files:[transcripte], ephemeral: true })

          client.channels.cache.get(canalito).send({ content: `El usuario <@${usario}> ah decidido cerrar el ticket` })

          setTimeout(() => {
            client.channels.cache.get(canalito).delete()
            canal.delete(`${BaseInteraction.user.id}`)
          }, 5000)

          client.channels.cache.get(Logs).send({content:`El usuario <@${usario}> ah decidido cerrar el ticket`,files:[transcripte]})

          break;


        case "Close":

          let user = await canal.find(false, (c) => c.Canal == BaseInteraction.channel.id)

          let usuario = client.users.cache.get(user.User)
          let caanal = client.channels.cache.get(user.Canal)
          
          const close = new EmbedBuilder()
            .setTitle("Cerrando ticket")
            .setDescription(`El ticket se eliminará en unos segundos`)
            .setFooter({ text: `Sistema de tickets` })
            .setTimestamp()
            .setColor("#37DE06")

            const transcript = await createTranscript(caanal,{
              limit: -1,
              returnBuffer:false,
              fileName: `Ticket.html`,

            })
            usuario.send({ content: "Tu ticket se ah cerrado por parte del staff" ,files:[transcript]})
          BaseInteraction.reply({ embeds: [close] })

           setTimeout(() => {
            BaseInteraction.channel.delete()
            canal.delete(`${user.User}`)
          }, 5000)

          client.channels.cache.get(Logs).send({content:`El usuario <@${usario}> ah decidido cerrar el ticket`,files:[transcript]})

          break;
      }

    }
  }
}