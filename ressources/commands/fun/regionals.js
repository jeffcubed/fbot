module.exports = ((main) => {

  return({
    run: ((d) => {

      let message = main.commands.getCleanMessage(d);

      if(!message) return main.commands.unknownArgs(d);

      message = message.replace(/[A-Za-z]/g, (match) => {
        return ':regional_indicator_' + match.toLowerCase() + ': ';
      }).replace(/[0-9]/g, (match) => {
        return ':' + ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][parseInt(match)] + ': ';
      });

      if(message.length > 2000) return d.channel.send('The message you tried to convert is too long, try something shorter');

      d.channel.send(message);

    }),
    description: "Converts the given message into regionals",
    category: "Utilities",
    args: "(message..)",
    aliases: ["regional", "emoji"],
    cooldown: 1000
  });

});
