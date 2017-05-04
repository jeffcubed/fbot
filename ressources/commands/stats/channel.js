module.exports = ((main, d, id) => {

  if(id) {

    id = id.replace(/[<!#@>]/g, '');

    if(!id.match(/\d/)) return d.channel.send('Invalid Channel ID');

  } else {

    id = d.channel.id;

  }

  main.pgPool.connect((err, client, done) => {
    if(err) {
      main.commands.handleError(err, d);
      return done();
    }

    client.query('SELECT userid,count(*) FROM messages WHERE channelid = $1 GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', [id], (err, topUser) => {
      if(err) {
        main.commands.handleError(err, d);
        return done();
      }

      client.query('SELECT message,count(*) FROM commands WHERE channelid = $1 GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', [id], (err, topCommand) => {
        if(err) {
          main.commands.handleError(err, d);
          return done();
        }

        client.query('SELECT (SELECT count(*) FROM commands WHERE channelid = $1) commandCount, (SELECT count(*) FROM messages WHERE channelid = $1) messageCount', [id], (err, counters) => {
          done();
          if(err) return main.commands.handleError(err, d);

          var topUserObj = topUser.rows[0] && main.bot.users.get(topUser.rows[0].userid);

          let embed = new main.api.RichEmbed();

          embed.setTitle('Channel Statistics for #' + (main.bot.channels.has(id) ? main.bot.channels.get(id).name : 'unknown'));
          embed.setDescription('Most messages by: **' + (topUser.rows[0] ? ((topUserObj ? (topUserObj.tag) : 'Unknown Name') + '** (' + topUser.rows[0].count + ' messages)') : 'None') + '\n' +
            'Most used command: ' + (topCommand.rows[0] ? ('**' + main.cfg.commandPrefix + topCommand.rows[0].message + '** (' + topCommand.rows[0].count + ' uses)') : 'No commands executed') + '\n\n' +
            'Commands executed: **' + counters.rows[0].commandcount + '** in total\n' +
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
