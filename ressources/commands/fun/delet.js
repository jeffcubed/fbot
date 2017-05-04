module.exports = ((main) => {

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      if(args.length === 0) {

        d.channel.send('delet yourself');

      } else if(args.length === 1 && d.mentions.users.first()) {

        let id = d.mentions.users.first().id;

        if(id === '254696880120791040' || id === '277411860125581312') id = d.author.id;

        d.channel.send('delet yourself, <@' + id + '>');

      } else main.commands.unknownArgs(d);

    }),
    description: "Delete yourself",
    args: "[@user]",
    category: "Fun",
    aliases: ["delete"],
    cooldown: 1000
  });

});
