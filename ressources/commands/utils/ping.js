module.exports = ((main) => {

  return({
    run: ((d) => {

      var start = Date.now();

      d.channel.send('Pinging...').then((message) => {
        var time = Math.round((Date.now() - start) / 2);
        message.edit('It took `' + time + 'ms` to send this message');
      });

    }),
    description: "Replies with the bot's ping time",
    category: "Utilities",
    cooldown: 1000
  });

});
