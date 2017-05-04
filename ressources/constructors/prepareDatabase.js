module.exports = ((main) => {

  const pg = require('pg');

  var client = new pg.Client({
    user: main.cfg.db.user,
    password: main.cfg.db.password,
    database: 'postgres',
    host: main.cfg.db.host,
    port: main.cfg.db.port,
  });

  client.connect((err) => {
    if(err) throw err;

    client.query('DROP DATABASE IF EXISTS ' + main.cfg.db.db, (err, result) => {
      if(err) throw err;

      client.query('CREATE DATABASE ' + main.cfg.db.db, (err, result) => {
        if(err) throw err;
        client.end();

        console.log('[SQL] '.red + 'Databases created! You can now start the bot');
      });

    });

  });

});
