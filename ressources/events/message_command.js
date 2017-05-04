module.exports = ((main) => {

  main.bot.on('message', (message) => {

    if(!message.content.startsWith(main.cfg.commandPrefix)) return;

    if(message.author.bot) return;

    if(message.channel.type !== 'text') message.channel.send('Commands cannot be executed via DM');

    if(message.guild && !message.guild.members.get(main.bot.user.id).hasPermission('SEND_MESSAGES')) return message.author.send('Sorry, but I don\'t have permission to post in that channel!');

    var gID = (message.guild && message.guild.id) || 0;

    main.pgPool.connect((err, client, done) => {

      if(err) {
        main.logger.log('[SQL] '.red + ('Error saving AI data to database:\n' + err.toString()).bgRed);
        return done();
      }

      client.query('SELECT * FROM blacklists WHERE (type = \'server\' AND id = $1) OR (type = \'channel\' AND id = $2) OR (type = \'user\' AND id = $3)', [gID, message.channel.id, message.author.id], (err, res) => {

        if(err) {
          main.logger.log('[SQL] '.red + ('Error saving AI data to database:\n' + err.toString()).bgRed);
          return done();
        }

        if(res.rowCount > 0) return done();

        let command = message.content.split(/\s/g)[0].replace(main.cfg.commandPrefix, '').toLowerCase();

        if(main.commands[command] && typeof main.commands[command] === 'object') {

          command = main.commands[command].name;

          if(main.commands[command].cooldown) {

            if(main.commandCooldowns[message.author.id]) {

              if(main.commandCooldowns[message.author.id][command] > Date.now()) {

                message.channel.send(':x: Cooldown! Please wait another ' + main.hd(Date.now() - main.commandCooldowns[message.author.id][command], {
                  round: true
                }) + ' before using this command')

                return done();

              }

              main.commandCooldowns[message.author.id][command] = (Date.now() + main.commands[command].cooldown);

            } else {

              main.commandCooldowns[message.author.id] = {};
              main.commandCooldowns[message.author.id][command] = (Date.now() + main.commands[command].cooldown);

            }

          }

          if(!main.commands[command].adminOnly || (main.commands[command].adminOnly && main.cfg.botAdmins.includes(message.author.id))) {

            main.logger.log('[COMMANDS] '.magenta + (main.cfg.commandPrefix + command).cyan +
              ' by ' + (message.author.username + '#' + message.author.discriminator + ' (' + message.author.id + ')').bold +
              ' in channel ' + ('#' + ((message.channel.name) || 'Unknown Name') + ' (' + message.channel.id + ')').cyan +
              ' on server ' + (((message.guild && message.guild.name) || 'Unknown Name') + ' (#' + ((message.guild && message.guild.id) || 0) + ')').magenta);

            message.channel.startTyping();
            message.channel.stopTyping(true);

            main.commands[command].run(message);

          } else {

            message.channel.send(main.noPermsMessage)

          }

          if(main.commands[command].adminOnly) return done();

          client.query('INSERT INTO commands VALUES ($1, $2, $3, $4, $5)', [message.id, message.channel.id, message.author.id, main.commands[command].name, gID], (err) => {
            done();
            if(err) return main.logger.log('[SQL] '.red + ('Error saving command to database:\n' + err.toString()).bgRed);
          });

        } else {

          return done(); //disable unknown command message for now
          main.commands.unknown.run(message);

        }

      });

    });

  });

});
