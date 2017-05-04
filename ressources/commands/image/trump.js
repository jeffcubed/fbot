module.exports = ((main) => {

  var trumpFiles = main.fs.readdirSync('./ressources/files/trump/');

  return({
    run: ((d) => {

      var trumpFileName = trumpFiles[Math.floor(trumpFiles.length * Math.random())];
      var trumpFile = main.fs.readFileSync('./ressources/files/trump/' + trumpFileName);

      d.channel.send({
        files: [{
          attachment: trumpFile,
          name: 'trump.' + trumpFileName.replace(/.*\./, '')
        }]
      });


    }),
    description: "i love china",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
