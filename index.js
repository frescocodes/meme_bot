const fs = require('fs');
const Discord = require('discord.js');

const { token, prefix } = require('./config.json');

// instantiate new discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./src/commands')
  .filter(file => file.endsWith('.js'));

//
for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

// starting message
client.once('ready', () => {
  console.log('Listening...');
});

client.on('message', message => {
  // if message doesn't begin with prefix, or message author is bot
  const args = message.content.slice(prefix.length).split(' ');
  // takes prefix and removes it from string, gets only the command
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(
      'There was an error trying to execute that command, sorry :('
    );
  }
});

// login
client.login(token);
