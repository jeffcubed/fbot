module.exports = ((main) => {

  return({
    run: ((d) => {

      var start = Date.now();

      d.channel.send('Speedtest running, this might take some time..').then((res) => {

        let test = main.speedtest({
          pingCount: 25
        });

        test.on('data', (data) => {

          res.edit('Speedtest done!\n```\nPing:     ' + Math.round(data.server.ping) + 'ms\nDownload: ' + data.speeds.download + ' Mb/s\nUpload:   ' + data.speeds.upload + ' Mb/s```');

        });

        test.on('error', (err) => {

          res.edit('Failed to execute speedtest!');

        })

      });

    }),
    description: "Runs a speed test",
    category: "Botadmin",
    adminOnly: true
  });

});
