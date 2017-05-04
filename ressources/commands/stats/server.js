module.exports = ((main, d, id) => {

  if(id) {
    if(!id.match(/\d/)) return d.channel.send('Invalid Server ID');

    if(!main.bot.guilds.get(id)) return d.channel.send('The Bot is not in this server');
  } else {

    id = d.guild.id;

  }

  main.pgPool.connect((err, client, done) => {
    if(err) {
      main.commands.handleError(err, d);
      return done();
    }

    client.query('SELECT userid,count(*) FROM messages WHERE serverid = $1 GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', [id], (err, topUser) => {
      if(err) {
        main.commands.handleError(err, d);
        return done();
      }

      client.query('SELECT message,count(*) FROM commands WHERE serverid = $1 GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', [id], (err, topCommand) => {
        if(err) {
          main.commands.handleError(err, d);
          return done();
        }

        client.query('SELECT (SELECT count(*) FROM commands WHERE serverid = $1) commandCount, (SELECT count(*) FROM messages WHERE serverid = $1) messageCount', [id], (err, counters) => {
          done();
          if(err) return main.commands.handleError(err, d);

          var serverOwner = main.bot.guilds.get(id).owner.user;
          var topUserObj = main.bot.users.get(topUser.rows[0].userid);

          let embed = new main.api.RichEmbed();

          embed.setTitle('Server Statistics for ' + main.bot.guilds.get(id).name);
          embed.setDescription('Server by: **' + (serverOwner ? (serverOwner.tag) : 'Unknown Name') + '**\n' +
            'Server Icon: https://cdn.discordapp.com/icons/' + id + '/' + main.bot.guilds.get(id).icon + '?size=1024\n\n' +
            'Most messages from: ' + (topUser.rows[0] ? ((topUserObj ? (topUserObj.tag) : 'Unknown Name') + ' (' + topUser.rows[0].count + ' messages)') : 'None') + '\n' +
            'Most used command: ' + (topCommand.rows[0] ? ('**' + main.cfg.commandPrefix + topCommand.rows[0].message + '** (' + topCommand.rows[0].count + ' uses)') : 'None') + '\n\n' +
            'Commands received: **' + counters.rows[0].commandcount + '** in total\n' +
            'Messages received: **' + counters.rows[0].messagecount + '** in total');
          embed.setFooter('fbot.menchez.me');
          embed.setColor(main.colors.info);

          d.channel.send({
            embed: embed
          });

        });

      });

    });

  });

});
