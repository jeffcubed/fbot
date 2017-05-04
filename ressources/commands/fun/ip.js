module.exports = ((main) => {

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      if(args.length === 1 && d.mentions.users.first()) {

        let user = d.mentions.users.first();

        let id = user.id;

        let ip = [(id % 95) + 96, (id * 2 % 71) + 120, (id * 3 % 120) + 71, (id * 4 % 100) + 91].join('.');

        d.channel.send('`' + user.tag + '`\'s IP address is `' + ip + '`');

      } else main.commands.unknownArgs(d);

    }),
    description: "Finds the users IP address",
    args: "(@user)",
    category: "Fun",
    cooldown: 1000
  });

});
