
const {Config}=require("../../forma/config")
  module.exports = {
    name: 'guildMemberRemove',
    async execute( client, EmbedBuilder,member) {
      const canale = Config.Channels.Logs
      
      if(canale == null || undefined)return;

      if(canale == null)return;
      const embed = new EmbedBuilder()
      .setTitle("📤Un usuario se a salido📤") 
      .setAuthor({name:"usuario menos",iconURL: member.user.displayAvatarURL()})
      .setDescription(`El usuario ${member.user}se ah salido del servidor 
      <a:pepe_sad:959871323671261194>`)
      .setFooter({text: `ID del usuario: ${member.user.id}`})
      .setColor("#F22E03")
    
      client.channels.cache.get(canale).send( {embeds:[embed]} )

    }}