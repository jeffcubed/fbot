module.exports = ((main) => {

  return({
    run: ((d) => {

      d.channel.send('The bot\'s twitter account has been suspended. This command has been disabled because of this.\n(seriously though, props to you guys for getting it banned)\n\nhttps://pbs.twimg.com/media/C7cWuVSXkAAzAkp.jpg');

    }),
    description: "BOT GOT B&",
    args: "(message..)",
    category: "Fun",
    cooldown: 1000 * 30
  });

});
