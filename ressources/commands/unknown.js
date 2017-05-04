module.exports = ((main) => {

  return({
    run: ((d) => {

      d.channel.send('This command does not exist, try **' + main.cfg.commandPrefix + 'help**.')

    }),
    description: "Runs when there's an unknown command",
    category: "Internal"
  });

});
