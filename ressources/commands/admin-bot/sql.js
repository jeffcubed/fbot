module.exports = ((main) => {

  return({
    run: ((d) => {

      main.pgPool.connect((err, client, done) => {
        if(err) return d.channel.send('Error executing query:\n```\n' + err.message + '```');

        client.query(main.commands.getMessage(d), (err, sqlResult) => {
          done();

          if(err) return d.channel.send('Error executing query:\n```\n' + err.message + '```');

          result = '```json\n';
          result += JSON.stringify(sqlResult.rows, null, 4);

          if(result.length > 1990) result = result.substring(0, 1990) + '...';
          result += '```';

          d.channel.send(result);

        });
      });

    }),
    description: "Executes SQL queries serverside",
    category: "Botadmin",
    args: "(query..)",
    adminOnly: true
  });

});
