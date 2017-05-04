module.exports = ((main) => {

  return({
    run: ((d) => {

      usersCount = 0;

      let servers = [];

      for(server of main.bot.guilds.values()) {

        if(server.memberCount) usersCount += server.memberCount;

        servers.push(server);

      };

      servers.sort((s1, s2) => s2.memberCount - s1.memberCount);

      let list = '```┌─────────────────────────────────┬───────────┐\n│ Name                            │ Users     │\n├─────────────────────────────────┼───────────┤\n';

      let serversShown = 0;

      servers.forEach((server) => {
        if(list.length > 1500 || serversShown >= 10) return;
        serversShown++;
        let name = server.name.substring(0, 30);
        list += '│ ' + name + (new Array(32 - name.length)).join(' ') + ' │ ' + server.memberCount + (new Array(10 - server.memberCount.toString().length)).join(' ') + ' │\n';
      });

      list += '├─────────────────────────────────┼───────────┤\n';
      list += '│ Servers in total                │ ' + main.bot.guilds.size + Array(10 - main.bot.guilds.size.toString().length).join(" ") + " │\n";
      list += '│ Users in total                  │ ' + usersCount + Array(10 - usersCount.toString().length).join(" ") + " │\n";
      list += '└─────────────────────────────────┴───────────┘```';

      list = 'Top ' + serversShown + ' servers:\n\n' + list;

      d.channel.send(list);

    }),
    description: "Lists the top 10 servers the bot is on",
    category: "Utilities",
    cooldown: 1000
  });

});
