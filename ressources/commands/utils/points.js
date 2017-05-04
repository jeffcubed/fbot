module.exports = ((main) => {

  const aiWeight = 10;
  const commandWeight = 2;
  const messageWeight = 1;

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      let id;

      if(args.length === 0) {

        id = d.author.id;

      } else if(args.length === 1) {

        id = args[0].replace(/[^\d]/g, '');

        if(!id.match(/\d+/)) return main.commands.unknownArgs(d);

      } else return main.commands.unknownArgs(d);

      main.pgPool.connect((err, client, done) => {
        if(err) {
          main.commands.handleError(err, d);
          return done();
        }

        client.query('SELECT (SELECT count(*) * $2 FROM ai WHERE userid = $1) + (SELECT count(*) * $3 FROM commands WHERE userid = $1) + (SELECT count(*) * $4 FROM messages WHERE userid = $1) points', [id, aiWeight, commandWeight, messageWeight], (err, points) => {
          done();
          if(err) return main.commands.handleError(err, d);

          let pointCount = Math.round(points.rows[0].points / 10);

          let level = Math.round(Math.sqrt(pointCount));

          let xpToNext = Math.pow(level + 1, 2) - pointCount;

          let embed = new main.api.RichEmbed();

          let user = main.bot.users.get(id);

          embed.setAuthor((user ? (user.tag) : 'Unknown User'), user && user.avatarURL);
          embed.addField('Points', pointCount, true);
          embed.addField('Level', level, true);
          embed.addField('Points to next level', xpToNext);
          embed.setColor(main.colors.info);

          d.channel.send({
            embed: embed
          });

        });

      });

    }),
    description: "Shows the users level and points",
    category: "Utilities",
    args: "[@user]",
    aliases: ["level", "rank"],
    cooldown: 1000
  });

});
