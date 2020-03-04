module.exports = {
  name: "kill",
  description: "Kill someone in the server",
  execute(message, args) {
    if (!args || args == "me") {
      message.channel.send(
        `${message.author} 🔫 <:2Head:590278726361677824> BANG, see ya bruv`
      );
    } else {
      message.channel.send(`${args} 🔫 <:2Head:590278726361677824>`);
    }
  }
};
