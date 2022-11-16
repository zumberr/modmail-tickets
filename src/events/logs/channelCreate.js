const {Config}=require("../../forma/config")
const {ChannelType}=require("discord.js")
  module.exports = {
    name: 'channelCreate',
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
    
    
      const embed = new EmbedBuilder()
      .setTitle("📑Canal Creado📑")
      .addFields({name:"<a:flecha:885368999775449098> Se  ha creado el  canal",value: `${channel.toString()}(${channel.id})`})
      .addFields({name:"<a:flecha:885368999775449098> Tipo del canal",value:`${tipoCanal}`})
      .setFooter({text: `ID del canal: ${channel.id}`})
      .setColor("#4DE12F")
      client.channels.cache.get(canale).send( {embeds:[embed]} )
    }}