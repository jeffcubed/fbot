module.exports = ((main) => {

  return({
    run: ((d) => {

      let startTime = Date.now();

      main.commands = require('../../constructors/loadCommands.js')(main);

      d.channel.send('Reloaded! Took `' + (Date.now() - startTime) + 'ms`')

    }),
    description: "Reloads all commands",
    category: "Botadmin",
    adminOnly: true
  });

});
