module.exports = ((main) => {

  main.pgPool.connect((err, client, done) => {
    if(err) throw err;
    client.query('CREATE TABLE IF NOT EXISTS commands ("id" BIGINT PRIMARY KEY NOT NULL, "channelid" BIGINT NOT NULL, "userid" BIGINT NOT NULL, "message" TEXT NOT NULL, "serverid" BIGINT NOT NULL)', (err, result) => {
      done();
      if(err) throw err;
    });
  });

  main.pgPool.connect((err, client, done) => {
    if(err) throw err;
    client.query('CREATE TABLE IF NOT EXISTS messages ("id" BIGINT PRIMARY KEY NOT NULL, "channelid" BIGINT NOT NULL, "userid" BIGINT NOT NULL, "serverid" BIGINT NOT NULL)', (err, result) => {
      done();
      if(err) throw err;
    });
  });

  main.pgPool.connect((err, client, done) => {
    if(err) throw err;
    client.query('CREATE TABLE IF NOT EXISTS stats ("servers" BIGINT NOT NULL, "usersonline" BIGINT NOT NULL, "users" BIGINT NOT NULL, "messages" BIGINT NOT NULL, "commands" BIGINT NOT NULL, "time" BIGINT NOT NULL, "channels" BIGINT NOT NULL, dbsize BIGINT NOT NULL)', (err, result) => {
      done();
      if(err) throw err;
    });
  });

  main.pgPool.connect((err, client, done) => {
    if(err) throw err;
    client.query('CREATE TABLE IF NOT EXISTS settings ("server" BIGINT NOT NULL, "setting" TEXT NOT NULL, "value" TEXT)', (err, result) => {
      done();
      if(err) throw err;
    });
  });

  main.pgPool.connect((err, client, done) => {
    if(err) throw err;
    client.query('CREATE TABLE IF NOT EXISTS ai ("id" BIGINT PRIMARY KEY NOT NULL, "channelid" BIGINT NOT NULL, "userid" BIGINT NOT NULL, "message" TEXT NOT NULL, "serverid" BIGINT NOT NULL)', (err, result) => {
      done();
      if(err) throw err;
    });
  });

  main.pgPool.connect((err, client, done) => {
    if(err) throw err;
    client.query('CREATE TABLE IF NOT EXISTS blacklists ("type" TEXT NOT NULL, "id" BIGINT NOT NULL)', (err, result) => {
      done();
      if(err) throw err;
    });
  });

});
