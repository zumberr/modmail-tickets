const {Config}=require("../../forma/config")
  module.exports = {
    name: 'messageUpdate',
    async execute( client, EmbedBuilder,oldMessage,newMessage) {
      try {
      const canale = Config.Channels.Logs
      
      if(canale == null || undefined)return;

      
   if (oldMessage.embeds.length > 0)return;
   if(oldMessage.content === newMessage.content)return;


  const embed = new EmbedBuilder()
  .setTitle("📝Mensaje Editado📝")
  .setAuthor({name: "Mensaje editado",iconURL: newMessage.author.displayAvatarURL()})
  .setDescription(`El usuario ${newMessage.author} ha editado un mensaje`)
  .addFields({name:"<a:flecha:885368999775449098> Canal",value:`${newMessage.channel} (${newMessage.channel.id})`})
  .addFields({name:"<a:flecha:885368999775449098> ID del mensaje",value:`${oldMessage.id}`})
  .addFields({name:"<a:flecha:885368999775449098> Enviado por",value:`${newMessage.author}(${newMessage.author.id})`})
  .addFields({name:`<a:flecha:885368999775449098> Mensaje antiguo`,value: "```"+`${oldMessage.content}` + "```"})
  .addFields({name:`<a:flecha:885368999775449098> Mensaje Nuevo`,value: "```"+`${newMessage.content}` + "```"})
  .setFooter({text: `ID del mensaje: ${oldMessage.id}`})
  .setColor("#F8FC00")
  .setTimestamp()
  client.channels.cache.get(canale).send( {embeds:[embed]} )
      }catch(e){
        console.log(e)
      }    
}}