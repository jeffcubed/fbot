module.exports = ((main) => {

  return({
    run: ((d) => {

      const commandArgs = main.commands.getArgs(d);

      if(commandArgs.length === 0) {

        require('../stats/bot.js')(main, d);

      } else if(commandArgs.length === 1 || commandArgs.length === 2) {

        if(commandArgs[0] === 'channel') {

          require('../stats/channel.js')(main, d, commandArgs[1]);

        } else if(commandArgs[0] === 'user') {

          require('../stats/user.js')(main, d, commandArgs[1]);

        } else if(commandArgs[0] === 'server') {

          require('../stats/server.js')(main, d, commandArgs[1]);

        } else {
          main.commands.unknownArgs(d);
        }

      } else {
        main.commands.unknownArgs(d);
      }

    }),
    args: "[user [@user] | channel [#channel] | server [serverID]]",
    description: "Shows statistics of the given argument",
    category: "Utilities",
    cooldown: 1000
  });

});
