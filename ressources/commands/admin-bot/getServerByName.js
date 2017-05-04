module.exports = ((main) => {

  var times = 0;

  return({
    run: ((d) => {

      let name = main.commands.getMessage(d).toLowerCase();

      let servers = [];

      for(let server of main.bot.guilds.values()) {

        if(server.name.toLowerCase().includes(name)) servers.push({
          id: server.id,
          name: server.name
        });

      };

      let returnMessage = JSON.stringify(servers, null, 4);

      if(returnMessage.length > 1980) returnMessage = (returnMessage.substring(0, 1980) + '...');

      d.channel.send('```json\n' + returnMessage + '```');

    }),
    description: "Replies with a list of server IDs matching the argument",
    args: "(name..)",
    category: "Botadmin",
    adminOnly: true
  });

});
