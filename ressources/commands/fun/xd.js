module.exports = ((main) => {

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      if(args.length < 1 || args.length > 3) return main.commands.unknownArgs(d);

      let xd = [main.commands.cleanContent(args[0].substring(0, 16)), main.commands.cleanContent(args[1 % args.length].substring(0, 16)), main.commands.cleanContent(args[2 % args.length].substring(0, 16))];

      let message = '```\n' + xd[0] + '           ' + xd[0] + '     ' + xd[1] + '  ' + xd[2] + ' \n' +
        '  ' + xd[0] + '       ' + xd[0] + '       ' + xd[1] + '     ' + xd[2] + ' \n' +
        '    ' + xd[0] + '   ' + xd[0] + '         ' + xd[1] + '      ' + xd[2] + ' \n' +
        '       ' + (new Array(Math.round(xd[0].length / 2))).join(' ') + xd[0] + '           ' + (new Array(Math.round(xd[0].length / 2))).join(' ') + xd[1] + '      ' + xd[2] + ' \n' +
        '    ' + xd[0] + '   ' + xd[0] + '         ' + xd[1] + '      ' + xd[2] + ' \n' +
        '  ' + xd[0] + '       ' + xd[0] + '       ' + xd[1] + '     ' + xd[2] + ' \n' +
        xd[0] + '           ' + xd[0] + '     ' + xd[1] + '  ' + xd[2] + '```';

      d.channel.send(message);

    }),
    description: "xd",
    category: "Fun",
    args: "(word) [word] [word]",
    cooldown: 1000
  });

});
