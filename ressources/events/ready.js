module.exports = ((main) => {

  main.bot.on('ready', () => {

    if(main.reconnecting) return main.reconnecting = false;

    main.bot.user.setGame(main.cfg.commandPrefix + "help || fbot.menchez.me");

    main.ready = true;

    let timeTook = Date.now() - main.startTime;
    let timeTookString = '[' + timeTook + 'ms]';

    if(timeTook < 1500) {
      timeTookString = timeTookString.green;
    } else if(timeTook < 3000) {
      timeTookString = timeTookString.yellow;
    } else {
      timeTookString = timeTookString.red;
    }

    console.log('\n[MAIN] '.cyan + 'Live on ' + main.bot.guilds.size + ' servers, ready for commands! ' + timeTookString);

  });

});
