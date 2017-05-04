module.exports = ((main) => {

  main.bot.on('guildCreate', (guild) => {

    if(!main.ready) return main.indexedServers.push(guild.id);
    if(main.indexedServers.includes(guild.id)) return;
    main.logger.log('[EVENTS] '.yellow + 'Bot was added to server ' + (guild.name + ' (' + guild.id + ')').bold);

    main.indexedServers.push(guild.id);

    let embed = new main.api.RichEmbed();

    let botCount = guild.members.filter((u) => u.user.bot).size;

    embed.setTitle('Added to ' + guild.name);
    if(botCount / guild.memberCount > 0.5 && guild.memberCount > 10) embed.setDescription('⚠ This server might be a bot farm (~' + Math.round(botCount / guild.memberCount * 100) + '% bots)');
    embed.addField('Users', guild.memberCount, true);
    embed.addField('Bots', botCount, true);
    embed.addField('Bots/Users Ratio', (Math.round(botCount / guild.memberCount * 1000) / 1000), true);
    embed.setThumbnail(guild.icon ? ('https://cdn.discordapp.com/icons/' + guild.id + '/' + guild.icon + '.png?size=64') : 'https://placeholdit.imgix.net/~text?txtsize=16&txt=NO%20ICON&w=64&h=64');
    embed.setFooter('Server ID: ' + guild.id);
    embed.setColor(main.colors.success);

    main.bot.channels.get(main.cfg.logChannel).send({
      embed: embed
    });

    guild.defaultChannel.send(main.cfg.messages.serverJoinMessage.replace('{{BOTNAME}}', main.cfg.botName).replace('{{COMMAND_HELP}}', main.cfg.commandPrefix + 'help'));

  });

});
