module.exports = ((main) => {

  const script = JSON.parse(main.fs.readFileSync('./ressources/files/bee.json'));

  return({
    run: ((d) => {

      var args = main.commands.getArgs(d);
      var r = Math.floor(Math.random() * script.length);

      if(args.length === 1) {
        if(isNaN(args[0])) {

          return main.commands.unknownArgs(d);

        } else if(parseInt(args[0]) < 1) {

          return d.channel.send('The bee movie doesnt have a negative amount of lines :thinking:');

        } else if((parseInt(args[0])) > script.length) {

          return d.channel.send('The bee movie script doesn\'t have ' + args[0] + ' lines! Try something smaller');

        } else {
          r = (parseInt(args[0]) - 1);
        }
      }

      d.channel.send('"' + script[r] + '" *(Line ' + (r + 1) + ')*');

    }),
    description: "Sends a random bee movie quote",
    category: "Fun",
    args: "[line]",
    cooldown: 1000
  });

});
