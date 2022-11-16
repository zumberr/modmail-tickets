const db = require("megadb")
const canal = new db.crearDB("tickets")
module.exports = {
  name: 'messageCreate',
  async execute( client, EmbedBuilder,message) {
    const {Config} = require("../../forma/config")

    const canalito = await canal.find(false,(c) =>c.Md == message.channelId)
    const channel = await canal.find(false,(c) =>c.Canal == message.channelId)
   
    if(message.author.bot)return;
    //* a 
   if(canalito){
    if(message.channel.type == 1){
      
        if(message.channelId == canalito.Md){ //* del user al canal
          const cTicket = canalito.Canal
          const usuario = canalito.User
          const msg = message.content
  
          
          const msgUser = new EmbedBuilder()
          .setTitle("Respuesta del Usuario ")
          .setAuthor({name:message.author.username,iconURL:message.author.displayAvatarURL()})
          .addFields({name:"Usuario",value:`<@${usuario}>`})
          .addFields({name:"Mensaje",value:`${msg}`})
          .setTimestamp()
          .setColor("#27B83D")
          client.channels.cache.get(cTicket).send({embeds:[msgUser]})
        }
      }
    }else if(channel){
      if(message.channelId == channel.Canal){//* del canal al user
        const usuario = channel.User
        const msg = message.content
        const user = client.users.cache.get(usuario)

        const msgUser = new EmbedBuilder()
       
        .setTitle("Respuesta del Staff ")
        .setAuthor({name:message.author.tag,iconURL:message.author.displayAvatarURL()})
        .addFields({name:"Mensaje",value:`${msg}`})
        .setTimestamp()
        .setColor("#27B83D")
        user.send({embeds:[msgUser]})
        
      }
 }else {
    const prefix = Config.Prefix
    if (!message.content.startsWith(prefix) ) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.Comandos.get(commandName) || client.Comandos.find(a => a.alias && a.alias.includes(commandName))

 if(message.channel.type == 1){
  if (!command) {
      const embed = new MessageEmbed()
          .setTitle('Error |<a:no:856039474383421440>')
          .setDescription(`El comando **${commandName}** no existe <a:no:856039474383421440>`)
          .setColor("RED")
      message.channel.send({ embeds: [embed] }).then(m => setTimeout(() => m.delete(), 1800));
  }} 
    try{
      command.execute(message, args, EmbedBuilder, client)
    }catch (e) {
      console.error(e)
      message.reply("Ocurrio un error al ejecutar el comando")}}
  }}

 