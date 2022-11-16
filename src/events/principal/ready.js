const {ActivityType}=require("discord.js")

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {


      console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓".blue)
      console.log("┃                                                                  ┃".blue)
      console.log('┃                      Ya estoy listo :D                           ┃'.blue)
      console.log("┃                                                                  ┃".blue)
      console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛".blue)

      let obj2 = {
          status: "online",
          activities: [{ name: "Usa el comando ,ticket en mi MD para abrir uno", type: ActivityType.Playing }]
      }

  
      client.user.setPresence(obj2)
     

      
    }}