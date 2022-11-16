const {Client,GatewayIntentBits,Partials, Collection, EmbedBuilder, ActivityType}= require("discord.js")
const fs = require("fs")
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildScheduledEvents,
],
partials: [
    Partials.User,
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember,
],

})
//* constantes //////////////////////////////////////////////////////////////////
const {Config}=require("./src/forma/config")
const db = require("megadb")
const colors = require("colors")
colors.enable();



//* //////////////////////////
module.exports = client;

const {Eventos,Slash,Comandos} = require("./src/forma/hlandler")
Eventos(fs,client,EmbedBuilder)
Slash(fs,client,Collection)
Comandos(fs,client,Collection)

client.login(Config.Token)


