 const {Config}=require("../../forma/config")
  module.exports = {
    name: 'messageDelete',
    async execute( client, EmbedBuilder,message) {
      const canale = Config.Channels.Logs
      
      if(canale == null || undefined)return;

      let mensaje = message.attachments.size > 0 ? message.attachments.map(a => a.proxyURL).join("\n") : message.content

      if (message.embeds.length > 0)return;
      const embed = new EmbedBuilder()
  .setTitle("🗑️Mensaje Borrado🗑️")
  .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL(),})
  .setThumbnail(message.author.displayAvatarURL({dynamic: true }) )
  .setDescription(`El usuario ${message.author} ha borrado un mensaje: `)
  .addFields({name:"Canal", value:`${message.channel.toString()} (${message.channel.id})`}) 
  .addFields({name:"Mensaje",value:"```"+ `${mensaje}`+"```"})
  .addFields({name:"Fecha",value: `<t:${Math.round(message.createdTimestamp/1000)}:F> (<t:${Math.round(message.createdTimestamp/1000)}:R>)` })
  .setFooter({ text: `ID del mensaje: ${message.id}`  })
  .setColor("#F22E03")
  .setTimestamp();

  client.channels.cache.get(canale).send( {embeds:[embed]} )
      




    }}