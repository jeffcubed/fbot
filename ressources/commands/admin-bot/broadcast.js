module.exports = ((main) => {

  return({
    run: ((d) => {

      let bcMsg = main.commands.getCleanMessage(d);

      if(bcMsg.length < 3) return d.channel.send('Broadcasts must be at least three characters');

      if(bcMsg.length > 1500) bcMsg = (bcMsg.substring(0, 1500) + '...');

      let index = 0;

      for(let server of main.bot.guilds.values()) {

        index++;

        setTimeout(() => {

          main.pgPool.connect((err, client, done) => {

            if(err) {
              main.commands.handleError(err, d);
              return done();
            }

            client.query('SELECT * FROM blacklists WHERE (type = \'server\' AND id = $1) OR (type = \'channel\' AND id = $2)', [server.id, server.defaultChannel.id], (err, res) => {
              done();
              if(err) return main.commands.handleError(err, d);

              if(res.rowCount > 0) return;

              server.defaultChannel.send(bcMsg);

            });

          });

        }, 5000 * index);

      }

      d.channel.send('Broadcasting to ' + main.bot.guilds.size + ' servers, going to take approx. ' + main.hd(main.bot.guilds.size * 5000) + '..');

    }),
    description: "Broadcasts a message to all servers #general channels",
    category: "Botadmin",
    args: "(message..)",
    adminOnly: true
  });

});
