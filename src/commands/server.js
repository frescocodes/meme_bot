module.exports = {
  name: 'server',
  description: 'Lists the server name and amount of members',
  execute(message, args) {
    message.channel.send(
      `**Server name:** ${message.guild.name}\n**Total members:** ${message.guild.memberCount}`
    );
  },
};
