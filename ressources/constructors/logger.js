module.exports = ((main) => {

  return({
    "log": ((message) => {

      console.log(message);

      let dateString = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

      main.fs.appendFile('./bot.log', ('[' + dateString + '] ' + message + '\n'), (err) => {
        if(err) console.log('[LOGGER] '.cyan + ('Error appending to logfile:\n' + err).bgRed);
      });

    })
  });
});
