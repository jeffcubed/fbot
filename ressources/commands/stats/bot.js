module.exports = ((main, d) => {

  main.pgPool.connect((err, client, done) => {
    if(err) {
      main.commands.handleError(err, d);
      return done();
    }

    client.query('SELECT serverid,count(*) FROM messages GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', (err, topServer) => {
      if(err) {
        main.commands.handleError(err, d);
        return done();
      }

      client.query('SELECT userid,count(*) FROM messages GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', (err, topUser) => {
        if(err) {
          main.commands.handleError(err, d);
          return done();
        }

        client.query('SELECT message,count(*) FROM commands GROUP BY 1 ORDER BY count(*) DESC LIMIT 1', (err, topCommand) => {
          if(err) {
            main.commands.handleError(err, d);
            return done();
          }

          client.query('SELECT (SELECT count(*) FROM commands) commandCount, (SELECT count(*) FROM messages) messageCount', (err, counters) => {
            done();
            if(err) return main.commands.handleError(err, d);

            var topUserObj = main.bot.users.get(topUser.rows[0].userid);

            let currentServers = main.bot.guilds.size;

            let onlineUsers = 0;
            let allUsers = 0;

            let cpuVars = require('os').cpus();

            let timings = {
              user: 0,
              sys: 0,
              idle: 0
            };

            cpuVars.forEach((cpuVar) => {
              timings.user += cpuVar.times.user;
              timings.sys += cpuVar.times.sys;
              timings.idle += cpuVar.times.idle;
            });

            let percUser = timings.user / (timings.user + timings.sys + timings.idle);

            for(let server of main.bot.guilds.values()) {

              if(server.memberCount) allUsers += server.memberCount;

              for(let presence of server.presences.values()) {

                if(presence.status !== 'offline') onlineUsers++;

              }

            }

            let channels = main.bot.channels.size;

            let embed = new main.api.RichEmbed();

            embed.setTitle('Bot Statistics');
            embed.setDescription('Listening on ' + currentServers + ' servers with ' + onlineUsers + ' out of ' + allUsers + ' users online\n\n' +
              'Most messages on: **' + (main.bot.guilds.get(topServer.rows[0].serverid) ? main.bot.guilds.get(topServer.rows[0].serverid).name : 'Unknwon Name') + '** (' + topServer.rows[0].count + ' messages)\n' +
              'Most messages from: **' + (topUserObj ? (topUserObj.tag) : 'Unknown Name') + '** (' + topUser.rows[0].count + ' messages)\n' +
              'Most used command: **' + main.cfg.commandPrefix + topCommand.rows[0].message + '** (' + topCommand.rows[0].count + ' uses)\n\n' +
              'Commands received: **' + counters.rows[0].commandcount + '** in total\n' +
              'Messages received: **' + counters.rows[0].messagecount + '** in total\n\n' +
              'Using ' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB of RAM\n' +
              'Using ' + percUser.toFixed(2) + '% CPU');
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

});
