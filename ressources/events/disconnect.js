module.exports = ((main) => {

  main.bot.ws.on('close', (event) => {

    main.startTime = Date.now();
    main.ready = false;

    if(event.code === 1000) {

      console.log('\n[MAIN] '.cyan + 'Oh no, looks like we were disconnected! Killing the bot..');
      process.exit(-1);

    } else if(event.code === 1006) {

      console.log('\n[MAIN] '.cyan + ('Connection was killed with code ' + event.code + ', reconnecting..').bgRed);

    } else {

      main.logger.log('\n[MAIN] '.cyan + ('Connection was killed with an unknown status code (' + event.code + ', ' + (event.reason || 'No Reason') + '), reconnecting..').bgRed);

    }

  });

});
