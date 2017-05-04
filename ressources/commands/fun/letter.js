module.exports = ((main) => {

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      if(args.length < 2) return main.commands.unknownArgs(d);

      let to = main.commands.cleanContent(args.shift());
      let text = main.commands.cleanContent(args.join(' '));

      let closingArray = ['Yours truly', 'Yours sincerely', 'With respect', 'With love'];

      let closing = closingArray[Math.floor(Math.random() * closingArray.length)];

      d.channel.send('```Dear ' + to + ',\n\n' + text + '\n\n' + closing + ',\n' + d.member.displayName + '```');

    }),
    description: "Dear matmen, please make shit commands",
    args: "(recipient) (message..)",
    category: "Fun",
    aliases: ["dear"],
    cooldown: 1000
  });

});
