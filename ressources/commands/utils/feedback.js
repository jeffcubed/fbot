module.exports = ((main) => {

  return({
    run: ((d) => {

      if(!main.commands.getMessage(d)) return main.commands.unknownArgs(d);

      let embed = new main.api.RichEmbed();

      embed.setTitle('Feedback');
      embed.setDescription(main.commands.getMessage(d));

      embed.addField('User', d.author.tag, true);
      embed.addField('User ID', d.author.id, true);

      embed.addField('Channel', '#' + d.channel.name, true);
      embed.addField('Channel ID', d.channel.id, true);

      embed.addField('Server', d.guild.name, true);
      embed.addField('Server ID', d.guild.id, true);

      embed.setFooter('Feedback #' + d.id);

      embed.setThumbnail(d.author.avatar ? ('https://cdn.discordapp.com/avatars/' + d.author.id + '/' + d.author.avatar + '.png?size=64') : 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.jpg?size=64');
      embed.setColor(main.colors.info);

      main.bot.channels.get(main.cfg.logChannel).send({
        embed: embed
      }).then(() => d.channel.send('Feedback sent!'));

    }),
    description: "Sends feedback to the bot developer",
    category: "Utilities",
    args: "(message..)",
    aliases: ["complain"],
    cooldown: 1000 * 20
  });

});
