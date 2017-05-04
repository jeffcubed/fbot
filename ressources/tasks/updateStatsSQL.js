module.exports = ((main) => {

  return({
    run: (() => {

      let currentServers = main.bot.guilds.size;

      let onlineUsers = 0;
      let allUsers = 0;

      for(server of main.bot.guilds.values()) {

        if(server.memberCount) allUsers += server.memberCount;

        for(presence of server.presences.values()) {

          if(presence.status !== 'offline') onlineUsers++;

        }

      }

      let channels = main.bot.channels.size;

      main.pgPool.connect((err, client, done) => {
        if(err) {
          main.logger.log('[SQL] '.red + ('Error saving stats to database:\n' + err.toString()).bgRed);
          return done();
        }

        client.query('SELECT (SELECT count(*) FROM messages) messageCount, (SELECT count(*) FROM commands) commandCount, (SELECT pg_database_size(\'fbot\')) dbsize', (err, stats) => {
          if(err) {
            main.logger.log('[SQL] '.red + ('Error saving stats to database:\n' + err.toString()).bgRed);
            return done();
          }

          client.query('INSERT INTO stats VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [currentServers, onlineUsers, allUsers, stats.rows[0].messagecount, stats.rows[0].commandcount, Date.now(), channels, stats.rows[0].dbsize], (err, eventCount) => {
            done();
            if(err) return main.logger.log('[SQL] '.red + ('Error saving stats to database:\n' + err.toString()).bgRed);
          });

        });

      });

    }),
    "description": "INSERTs current stats into the database",
    "interval": 30 * 60 * 1000
  });

});
