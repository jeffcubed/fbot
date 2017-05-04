module.exports = ((main, d, id) => {

  if(id) {
    id = id.replace(/[<!#@>]/g, '');

    if(!id.match(/\d/)) return d.channel.send('Invalid User ID');
  } else {
    id = d.author.id;
  }

  main.pgPool.connect((err, client, done) => {
    if(err) {
      main.commands.handleError(err, d);
      return done();
    }

    client.query('SELECT message,count(*) FROM commands WHERE userid = $1 GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', [id], (err, topCommand) => {
      if(err) {
        main.commands.handleError(err, d);
        return done();
      }

      client.query('SELECT (SELECT count(*) FROM commands WHERE userid = $1) commandCount, (SELECT count(*) FROM messages WHERE userid = $1) messageCount', [id], (err, counters) => {
        done();
        if(err) return main.commands.handleError(err, d);

        var servers = [];

        for(server of main.bot.guilds.values()) {
          if(server.members.has(id)) servers.push(server.name);
        };

        if(servers.length === 0 && main.bot.users.has(id)) servers.push(d.guild.name);

        let embed = new main.api.RichEmbed();

        embed.setTitle('User Statistics for @' + (main.bot.users.has(id) ? (main.bot.users.get(id).tag) : 'unknown'));
        embed.setDescription('Avatar: ' + ((main.bot.users.has(id) && main.bot.users.get(id).avatar) ? main.bot.users.get(id).avatarURL('png', 2048) : 'None') + '\n\n' +
          'Seen on **' + servers.length + '** servers: `' + (servers.length === 0 ? ('None') : (servers.slice(0, 3).join('`, `') + (servers.length > 3 ? '`, `+ ' + (servers.length - 3) + ' more' : ''))) + '`\n\n' +
          'Top command: ' + (topCommand.rows[0] ? ('**' + main.cfg.commandPrefix + topCommand.rows[0].message + '** (' + topCommand.rows[0].count + ' uses)') : 'No commands executed') + '\n\n' +
          'Commands executed: **' + counters.rows[0].commandcount + '** in total\n' +
          'Messages sent: **' + counters.rows[0].messagecount + '** in total');
        embed.setFooter('fbot.menchez.me');
        embed.setColor(main.colors.info);

        d.channel.send({
          embed: embed
        });

      });

    });

  });

});
