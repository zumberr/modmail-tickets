const {Config}=require("../../forma/config")
  module.exports = {
    name: 'guildMemberAdd',
    async execute( client, EmbedBuilder,member) {
      const canale = Config.Channels.Logs
      
      if(canale == null || undefined)return;

      if(canale == null)return;
  const embed = new MessageEmbed()
  .setTitle("📥Un usuario se a unido📥") 
  .setAuthor({name:"Nuevo usuario",iconURL: member.user.displayAvatarURL()})
  .setDescription(`El usuario ${member.user}se ah unido al servidor <a:partuy:876842625385246770>`)
  .addFields({name:"Tiempo de la cuenta",value:`${member.user.createdAt.toDateString()}`})
  .setFooter({text: `ID del usuario: ${member.user.id}`})
  .setColor("#4DE12F")
  client.channels.cache.get(canale).send( {embeds:[embed]} )
    }}