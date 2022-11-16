const {Config}=require("../../forma/config")
const {ChannelType}=require("discord.js")
  module.exports = {
    name: 'channelDelete',
    async execute( client, EmbedBuilder,channel) {
      const canale = Config.Channels.Logs
      
      if(canale == null || undefined)return;

      let tipo = channel.type
      let tipoCanal = ""
      if(tipo == ChannelType.GuildText){
        tipoCanal = "Texto"
      }else if(tipo == ChannelType.GuildVoice){
        tipoCanal = "Voz"
      }else if(tipo == ChannelType.GuildCategory){
        tipoCanal = "Categoría"
      }else if(tipo == ChannelType.AnnouncementThread){
        tipoCanal = "Noticias"
      }
    
      if(canale == null)return;
      const embed = new EmbedBuilder()
      .setTitle("📑Canal Borrado📑")
      .addFields({name:"<a:flecha:885368999775449098> Se  ha borrado el  canal",value: `${channel.name}(${channel.id})`})
      .addFields({name:"<a:flecha:885368999775449098> Tipo del canal",value:`${tipoCanal}`})
      .setFooter({text: `ID del canal: ${channel.id}`})
      .setColor("#F22E03")
      client.channels.cache.get(canale).send( {embeds:[embed]} )
    }}