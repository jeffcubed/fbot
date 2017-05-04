module.exports = ((main) => {

  const settingToBoolean = (value) => {
    if(typeof(value) === 'string') value = value.toLowerCase();

    switch(value) {
      case 'true':
      case '1':
      case 'on':
      case 'yes':
        return true;
      default:
        return false;
    }
  };

  const mentionToString = (value) => {
    return value.replace(/[^0-9]/g, '');
  };

  const modifyableSettings = {
    'joinMessage': String,
    'leaveMessage': String,
    'messageChannel': mentionToString,
    'optOutOfAI': settingToBoolean,
    'disableAutoreact': settingToBoolean
  };

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);
      let guildID = d.guild.id;

      if(args.length < 2) return main.commands.unknownArgs(d);

      if(args[0] === 'set' && args.length >= 3) {

        if(!d.member.hasPermission('ADMINISTRATOR') && !main.cfg.botAdmins.includes(d.author.id)) return d.channel.send('Sorry, but you need the `ADMINISTRATOR` permission to execute this command!');

        args.shift();

        let setting = args.shift();
        let newValue = args.join(' ');

        if(!modifyableSettings[setting]) return d.channel.send('The setting you tried to modify does not exist');

        newValue = modifyableSettings[setting](newValue);

        main.pgPool.connect((err, client, done) => {

          if(err) {
            main.logger.log('[SQL] '.red + ('Error writing setting to database:\n' + err.toString()).bgRed);
            return done();
          }

          client.query('DELETE FROM settings WHERE server = $1 AND setting = $2', [guildID, setting], (err) => {

            if(err) {
              main.logger.log('[SQL] '.red + ('Error writing setting to database:\n' + err.toString()).bgRed);
              return done();
            }

            client.query('INSERT INTO settings VALUES ($1, $2, $3)', [guildID, setting, newValue], (err) => {
              done();
              if(err) return main.logger.log('[SQL] '.red + ('Error writing setting to database:\n' + err.toString()).bgRed);

              d.channel.send(newValue ? ('Setting `' + setting + '` has been set to:\n\n`' + newValue + '`') : ('Setting `' + setting + '` has been turned off/cleared.'));

            });

          });

        });

      } else if(args[0] === 'current' && args.length === 2) {

        let settingString = args[1];

        if(!modifyableSettings[settingString]) {
          d.channel.send('Setting `' + settingString + '` does not exist');

          return;
        }

        main.pgPool.connect((err, client, done) => {

          if(err) {
            main.logger.log('[SQL] '.red + ('Error reading setting from database:\n' + err.toString()).bgRed);
            return done();
          }

          client.query('SELECT value FROM settings WHERE server = $1 AND setting = $2', [guildID, settingString], (err, setting) => {
            done();
            if(err) return main.logger.log('[SQL] '.red + ('Error reading setting from database:\n' + err.toString()).bgRed);

            if(setting.rowCount === 1) {

              d.channel.send('Setting `' + settingString + '` is set to:\n\n`' + setting.rows[0].value + '`');

            } else {

              d.channel.send('Setting `' + settingString + '` is not set');

            }

          });

        });

      } else if(args[0] === 'clear' && args.length === 2) {

        if(!d.member.hasPermission('ADMINISTRATOR') && !main.cfg.botAdmins.includes(d.author.id)) return d.channel.send('Sorry, but you need the `ADMINISTRATOR` permission to execute this command!');

        let setting = args[1];

        if(!modifyableSettings[setting]) return d.channel.send('The setting you tried to clear does not exist');

        main.pgPool.connect((err, client, done) => {

          if(err) {
            main.logger.log('[SQL] '.red + ('Error writing setting to database:\n' + err.toString()).bgRed);
            return done();
          }

          client.query('DELETE FROM settings WHERE server = $1 AND setting = $2', [guildID, setting], (err) => {
            done();
            if(err) main.logger.log('[SQL] '.red + ('Error writing setting to database:\n' + err.toString()).bgRed);

            d.channel.send('Setting `' + setting + '` has been turned off/cleared.');

          });

        });

      } else return main.commands.unknownArgs(d);

    }),
    description: "Modifies settings for the server, see <a href=\"/settings\">settings</a> for help",
    category: "Serveradmin",
    args: "(set (name) (value..) | current (name) | clear (name))",
    aliases: ["settings"]
  });

});
