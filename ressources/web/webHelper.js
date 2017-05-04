module.exports = ((main) => {

  let startTime = Date.now();

  const https = require('https');
  const express = require('express');
  const app = express();
  const fs = require('fs');

  app.set('views', './ressources/web/public/ejs')
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.render('index.ejs', {
      main: main
    });
  });

  app.get('*', (req, res, next) => {

    let fileName = req.path.replace('/', '') + '.ejs';

    if(!fs.existsSync('./ressources/web/public/ejs/' + fileName)) return next();

    res.render(fileName, {
      main: main
    });
  });

  app.use(express.static('./ressources/web/public'));

  app.get('/updates/*', (req, res, next) => {

    res.sendFile('/fbot/ressources/web/public/updates/index.html');

  });

  app.get('/api/stats', (req, res) => {

    main.pgPool.connect((err, client, done) => {
      if(err) {
        res.status(500);
        res.end('Error Connecting To Database');

        return done();
      }

      client.query('SELECT * FROM stats WHERE time >= $1 ORDER BY time DESC', [Date.now() - 30 * 24 * 60 * 60 * 1000], (err, stats) => {
        done();

        if(err) {
          res.status(500);
          res.end('Error Getting Data From Database');

          return;
        }

        res.status(200);
        res.end(JSON.stringify(stats.rows));

      });
    });

  });

  app.use((req, res) => {
    res.status(404);
    res.render('404.ejs', {
      main: main
    });
  });

  const server = https.createServer({
    pfx: main.fs.readFileSync('./ressources/web/certificate.pfx')
  }, app);

  server.listen(443);

  console.log('[WEB] '.red + 'Loaded web helper ' + ('[' + (Date.now() - startTime) + 'ms]').yellow);

});
