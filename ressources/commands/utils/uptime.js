module.exports = ((main) => {

  return({
    run: ((d) => {

      d.channel.send('The bot has been running for ' + main.hd(Date.now() - main.startTime, {
        round: true
      }));

    }),
    description: "Replies with the time since the last restart",
    category: "Utilities"
  });

});
