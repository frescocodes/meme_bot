const botConfig = require("./config.json");
const Discord = require("discord.js");

// instantiate new discord client
const client = new Discord.Client();

// starting message
client.once("ready", () => {
  console.log("Ready!");
});

// login
client.login(botConfig.token);
