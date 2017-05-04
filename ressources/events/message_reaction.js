module.exports = ((main) => {

  main.bot.on('message', (message) => {

    if(message.channel.type !== 'text' || message.author.id === main.bot.user.id) return;

    main.pgPool.connect((err, client, done) => {

      if(err) {
        main.logger.log('[SQL] '.red + ('Error reading setting from database:\n' + err.toString()).bgRed);
        return done();
      }

      client.query('SELECT value FROM settings WHERE server = $1 AND setting = $2 AND VALUE = \'true\'', [message.guild.id, 'disableAutoreact'], (err, disableAutoreact) => {
        done();
        if(err) return main.logger.log('[SQL] '.red + ('Error reading setting from database:\n' + err.toString()).bgRed);

        if(disableAutoreact.rowCount > 0) return;

        let text = message.content;

        if(text.match(/^ok$/i)) message.react('🆗');

        if(text.match(/y\/n(\?)?$/i)) message.react('🔼').then(() => message.react('🔽'));

        if(text.match(/🤔/gi)) message.react('🤔');

        if(text.match(/(^| )lit( |$)/gi)) message.react('🔥');

        if(text.match(/is this the police/gi)) message.react('🚔');

        if(text.match(/press f/gi)) message.react('🇫');

        if(text.match(/snek/gi)) message.react('🐍');

        if(text.match(/murica/gi)) message.react('🇺🇸');

        if(text.match(/heil/)) message.react('🇩🇪');

        if(text.match(/^add fbot to your( discord)? server at fbot\.menchez\.me$/i)) message.channel.send(message.content);

      });

    });

  });

});
