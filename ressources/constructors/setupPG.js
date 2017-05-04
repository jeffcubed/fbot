module.exports = ((main) => {

  const pg = require('pg');

  const pool = new pg.Pool({
    user: main.cfg.db.user,
    password: main.cfg.db.password,
    database: main.cfg.db.db,
    host: main.cfg.db.host,
    port: main.cfg.db.port,
    max: main.cfg.db.pool.maxClients,
    idleTimeoutMillis: main.cfg.db.idleTimeout
  });

  return pool;

});
