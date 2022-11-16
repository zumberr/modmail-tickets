const {ButtonBuilder,ActionRowBuilder}=require("discord.js")
const db = require("megadb")
const canal = new db.crearDB("tickets")
module.exports = {
  name: "ticket",
  alias: ['t'],
  description: 'comandos tickets',
  //cooldown:3000,
  async execute(message, args, EmbedBuilder, client) {
        
      
    
    const embed = new EmbedBuilder()
    .setTitle("Ticket ModMail")
    .setDescription(`Hola <@${message.author.id}>, soy ${client.user.tag} y seré quien te ayude a `)
    .addFields({name:"**Creación de tickets**",value:"porfavor selecciona en los botones de abajo el motivo de la creación del ticket"})
    .setColor("#13C7A6")
    .setFooter({text:"Sistema de tickets"})

    const boton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setCustomId("charla")
        .setLabel("Charla con el staff")
        .setStyle("Secondary")
        .setEmoji("✅"),

        new ButtonBuilder()
        .setCustomId("sup")
        .setLabel("Soporte")
        .setStyle("Success")
        .setEmoji("👮"),

        new ButtonBuilder()
        .setCustomId("help")
        .setLabel("Ayuda")
        .setStyle("Primary")
        .setEmoji("🙏"),

        new ButtonBuilder()
        .setCustomId("rep")
        .setLabel("reporte")
        .setStyle("Danger")
        .setEmoji("⛔"),

        new ButtonBuilder()
        .setCustomId("cerrar")
        .setLabel("Cierra ticket")
        .setStyle("Danger")
        .setEmoji("❌")

        )
 

    message.reply({embeds:[embed],components:[boton]})
   
  }}