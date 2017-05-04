module.exports = ((main) => {

  return({
    run: ((d) => {

      let discrim = main.commands.getMessage(d) || d.author.discriminator;

      if(!discrim.match(/\d{4}/)) return main.commands.unknownArgs(d);

      let names = [];

      for(guild of main.bot.guilds.values()) {

        for(member of guild.members.values()) {

          if(member.user.discriminator == discrim && !names.includes(member.user.tag)) names.push(member.user.tag);

        }

      }

      d.channel.send('Users matching #' + discrim + ':\n```js\n' + JSON.stringify(names, null, 4) + '```');

    }),
    description: "Lists all known users with this discriminator",
    category: "Utilities",
    args: "[discriminator]",
    cooldown: 1000
  });

});
