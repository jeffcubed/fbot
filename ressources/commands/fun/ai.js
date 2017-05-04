module.exports = ((main) => {

  return({
    run: ((d) => {

      let message = main.commands.getMessage(d);

      if(message) {

        let startTime = Date.now();

        main.aiFilter.check(message)
          .then((valid) => {
            d.channel.send((valid ? 'Passed' : 'Failed') + ' (took `' + (Date.now() - startTime) + 'ms`)');
          });

      } else {

        d.channel.send('nah fuck off');

      }

    }),
    description: "Replies with an AI answer (is borked)",
    args: "(message)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
