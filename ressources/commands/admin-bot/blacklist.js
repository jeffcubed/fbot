module.exports = ((main) => {

  let types = ['user', 'channel', 'server'];

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      let type = args.shift();

      if(!types.includes(type) || args.length != 1) return main.commands.unknownArgs(d);

      let id = args.shift().replace(/[^\d]/g, '');

      if(id.length < 3) return main.commands.unknownArgs(d);

      main.pgPool.connect((err, client, done) => {
        if(err) {
          main.commands.handleError(err, d);

          return done();
        }

        client.query('SELECT * FROM blacklists WHERE type = $1 AND id = $2', [type, id], (err, res) => {
          if(err) {
            main.commands.handleError(err, d);

            return done();
          }

          if(res.rowCount > 0) {

            client.query('DELETE FROM blacklists WHERE type = $1 AND id = $2', [type, id], (err) => {
              done();
              if(err) return main.commands.handleError(err, d);

              d.channel.send('Successfully unblacklisted `' + type + '` ID `' + id + '`');

            });

          } else {

            client.query('INSERT INTO blacklists VALUES ($1, $2)', [type, id], (err) => {
              done();
              if(err) return main.commands.handleError(err, d);

              d.channel.send('Successfully blacklisted `' + type + '` ID `' + id + '`');

            });

          }

        });

      });

    }),
    description: "Blacklists the given IDs",
    args: "(type) (ID)",
    category: "Botadmin",
    adminOnly: true
  });

});
