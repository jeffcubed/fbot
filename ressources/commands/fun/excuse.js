module.exports = ((main) => {

  const messages = JSON.parse(main.fs.readFileSync('./ressources/files/excuses.json'));

  return({
    run: ((d) => {

      d.channel.send(messages[Math.floor(Math.random() * messages.length)]);

    }),
    description: "Replies with a random excuse",
    category: "Fun",
    cooldown: 1000
  });

});
