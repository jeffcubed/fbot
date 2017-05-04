module.exports = ((main) => {

  var baguettes = main.fs.readdirSync('./ressources/files/baguette/');

  return({
    run: ((d) => {

      var baguetteName = baguettes[Math.floor(baguettes.length * Math.random())];
      var baguette = main.fs.readFileSync('./ressources/files/baguette/' + baguetteName);

      d.channel.send({
        files: [{
          attachment: baguette,
          name: 'baguette.' + baguetteName.replace(/.*\./, '')
        }]
      });


    }),
    description: "Sends a random baguette (what did you expect?)",
    category: "Fun",
    aliases: ["french"],
    cooldown: 1000 * 5
  });

});
