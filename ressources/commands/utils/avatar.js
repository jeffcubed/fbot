module.exports = ((main) => {

  return({
    run: ((d) => {

      if(d.mentions.users.size !== 1 || main.commands.getArgs(d).length !== 1) return main.commands.unknownArgs(d);

      d.channel.send(('`' + d.mentions.users.first().tag + '`') +
        (d.mentions.users.first().avatar ? ('\'s avatar is\n' + d.mentions.users.first().avatarURL('png', 2048)) : ' does not have an avatar set!'));

    }),
    description: "Replies with a user's avatar",
    category: "Utilities",
    args: "(@user)",
    cooldown: 1000
  });

});
