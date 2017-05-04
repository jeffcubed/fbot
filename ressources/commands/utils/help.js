module.exports = ((main) => {

  return({
    run: ((message) => {

      let commands = main.commands;
      let args = commands.getArgs(message);

      if(args.length === 1) {
        if(commands[args[0]] && typeof commands[args[0]] === 'object') {

          if(commands[args[0]].alias) args[0] = commands[args[0]].name;

          message.channel.send('```diff\n+ ' +
            main.cfg.commandPrefix + args[0] + '\n' +
            '- ' + commands[args[0]].description + '\n\n' +
            '- Usage:\n' +
            '-    ' + main.cfg.commandPrefix + args[0] + ' ' + (commands[args[0]].args || '') +
            '```');

        } else {

          message.channel.send('That command doesn\'t exist, try **' + main.cfg.commandPrefix + 'help**!');

        }

        return;
      }

      message.channel.send('You can find a list of commands here:\n\nhttps://fbot.menchez.me/');

    }),
    description: "Replies with a commands list",
    category: "Utilities",
    args: "[command]",
    aliases: ['commands']
  });

});
