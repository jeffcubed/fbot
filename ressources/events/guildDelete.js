module.exports = ((main) => {

  main.bot.on('guildDelete', (guild) => {

    if(main.indexedServers.includes(guild.id)) main.indexedServers.splice(main.indexedServers.indexOf(guild.id), 1);

    main.logger.log('[EVENTS] '.yellow + 'Bot was removed from server ' + (guild.name + ' (' + guild.id + ')').bold);

    let embed = new main.api.RichEmbed();

    let botCount = guild.members.filter((u) => u.user.bot).size;

    embed.setTitle('Removed from ' + guild.name);
    embed.addField('Users', guild.memberCount, true);
    embed.addField('Bots', botCount, true);
    embed.addField('Bots/Users Ratio', (Math.round(botCount / guild.memberCount * 1000) / 1000), true);
    embed.setThumbnail(guild.icon ? ('https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.png?size=128') : 'https://placeholdit.imgix.net/~text?txtsize=33&txt=NO%20ICON&w=128&h=128');
    embed.setFooter('Server ID: ' + guild.id);
    embed.setColor(main.colors.danger);

    main.bot.channels.get(main.cfg.logChannel).send({
      embed: embed
    });

  });

});
