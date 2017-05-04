module.exports = ((main) => {

  main.bot.on('guildMemberRemove', (m) => {

    let messageChannelID = m.guild.id;

    main.pgPool.connect((err, client, done) => {

      if(err) {
        main.logger.log('[SQL] '.red + ('Error reading setting from database:\n' + err.toString()).bgRed);
        return done();
      }

      client.query('SELECT value FROM settings WHERE server = $1 AND setting = $2', [m.guild.id, 'messageChannel'], (err, messageChannel) => {
        if(err) {
          main.logger.log('[SQL] '.red + ('Error reading setting from database:\n' + err.toString()).bgRed);
          return done();
        }

        if(messageChannel.rowCount > 0) messageChannelID = messageChannel.rows[0].value;

        if(!main.bot.channels.has(messageChannelID) || (main.bot.channels.get(messageChannelID).guild.id !== m.guild.id)) return done();

        client.query('SELECT value FROM settings WHERE server = $1 AND setting = $2', [m.guild.id, 'leaveMessage'], (err, setting) => {
          done();
          if(err) return main.logger.log('[SQL] '.red + ('Error reading setting from database:\n' + err.toString()).bgRed);

          if(setting.rowCount === 0 || !setting.rows[0].value) return;

          main.bot.channels.get(messageChannelID).send(
            setting.rows[0].value
            .replace('{{MENTION}}', '<@' + m.id + '>')
            .replace('{{USERNAME}}', m.user.username)
            .replace('{{DISCRIMINATOR}}', m.user.discriminator)
            .replace('{{SERVERNAME}}', m.guild.name)
          );

        });

      });

    });

  });

});
