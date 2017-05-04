module.exports = ((main) => {

  main.bot.on('message', (message) => {

    if(message.author.bot) return;

    var gID = (message.guild && message.guild.id) || 0;

    main.pgPool.connect((err, client, done) => {

      if(err) {
        main.logger.log('[SQL] '.red + ('Error saving message to database:\n' + err.toString()).bgRed);
        return done();
      }

      client.query('SELECT * FROM blacklists WHERE (type = \'server\' AND id = $1) OR (type = \'channel\' AND id = $2) OR (type = \'user\' AND id = $3)', [gID, message.channel.id, message.author.id], (err, res) => {

        if(err) {
          main.logger.log('[SQL] '.red + ('Error saving message to database:\n' + err.toString()).bgRed);
          return done();
        }

        if(res.rowCount > 0) return done();

        client.query('INSERT INTO messages VALUES ($1, $2, $3, $4)', [message.id, message.channel.id, message.author.id, gID], (err) => {
          done();
          if(err) return main.logger.log('[SQL] '.red + ('Error saving message to database:\n' + err.toString()).bgRed);
        });

      });

    });

  });

});
