module.exports = {
  name: "help",
  description: "List of available commands",
  execute(message, args) {
    message.channel.send(
      "List of available commands:\n```!help\n!corona\n!kill\n!server```"
    );
  }
};
