module.exports = ((main) => {

  let startTime = Date.now();

  var commands = {};

  let commandsCount = 0;
  let aliasesCount = 0;

  var loadCommandsIn = (path) => {

    main.fs.readdirSync(path).forEach((subName) => {

      if(main.fs.statSync(main.path.resolve(path, subName)).isDirectory()) {

        if(subName === 'stats') return;

        loadCommandsIn(main.path.resolve(path, subName));

      } else {

        if(subName === 'new.js') return;

        let file = main.path.resolve(path, subName);
        let name = subName.split('.')[0].toLowerCase();

        if(require.cache[require.resolve(file)]) delete require.cache[require.resolve(file)];

        if(commands[name]) return console.log('[COMMANDS] '.magenta + ('Tried to load already loaded command ' + name.bold + ' (Duplicate files?)').bgRed);

        commands[name] = require(file)(main);
        commands[name].name = name;

        if(commands[name].aliases) commands[name].aliases.forEach((alias) => {
          commands[alias] = {
            alias: true,
            name: name
          };
          aliasesCount++;
        });

        commandsCount++;

      }

    });

  }

  loadCommandsIn('./ressources/commands/');

  console.log('[COMMANDS] '.magenta + 'Loaded ' + commandsCount + ' commands with ' + aliasesCount + ' aliases ' + ('[' + (Date.now() - startTime) + 'ms]').yellow);

  commands.getMessage = (d) => {
    return d.content.substring(d.content.split(/[^\S\x0a\x0d]/g)[0].length + 1, d.content.length).replace(/(^\s+|\s+$)/g, '');
  }

  commands.getCleanMessage = (d) => {
    return d.cleanContent.substring(d.content.split(/[^\S\x0a\x0d]/g)[0].length + 1, d.content.length).replace(/(^\s+|\s+$)/g, '');
  }

  commands.getArgs = (d) => {
    const args = commands.getMessage(d).split(/[^\S\x0a\x0d]/g);
    if(args[0] === '') args.shift();
    return args;
  }

  commands.unknownArgs = (d) => {

    let command = d.content.split(/[^\S\x0a\x0d]/g)[0].replace(main.cfg.commandPrefix, '').toLowerCase();

    d.channel.send('Unknown arguments! Try the following:\n\n```\n' +
      main.cfg.commandPrefix + command + ' ' + (commands[command].args || '') +
      '\n```');

  }

  commands.handleError = (err, d) => {
    main.logger.log('[COMMANDS] '.magenta + ('Error executing command:\n' + JSON.stringify(err)).bgRed);

    let logChannel = main.bot.channels.get(main.cfg.logChannel);

    if(logChannel) logChannel.send('Command error:\nMessage: `' + d.content + '`\n\nError:\n```json\n' + JSON.stringify(err, null, 4) + '```');

    d.channel.send(main.defaultErrorMessage);
  }

  commands.getImageFromMessage = (d) => {

    let args = commands.getArgs(d);

    let url;

    if(d.attachments.size === 1) {

      url = d.attachments.first().url;

    } else if(args.length === 1) {

      if((d.mentions.users && d.mentions.users.first()) && args[0].match(/\<\@(\!)?\d+\>/g)) {

        let mention = d.mentions.users.first();

        url = mention.avatarURL('png', 2048) || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png';

      } else if(args[0].match(/^me$/i)) {

        url = d.author.avatarURL('png', 2048) || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png';

      } else {

        url = args[0];

      }

    } else {

      commands.unknownArgs(d);
      return false;

    }

    if(!url.match(/(http(s)?:\/\/)?(www\.)?.+\..+/i) || url.match(/\.(bin|zip|db|psb)$/)) {
      commands.unknownArgs(d);

      return false;
    }

    return url;

  }

  commands.getImageAndTextFromMessage = (d) => {

    let args = commands.getArgs(d);

    let url;

    if(d.attachments.size === 1) {

      url = d.attachments.first().url;

    } else if(args.length >= 2) {

      if((d.mentions.users && d.mentions.users.first()) && args[0].match(/\<\@(\!)?\d+\>/g)) {

        let mention = d.mentions.users.first();

        url = mention.avatarURL('png', 2048) || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png';

      } else if(args[0].match(/^me$/i)) {

        url = d.author.avatarURL('png', 2048) || 'https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png';

      } else {

        url = args[0];

      }

      args.shift();

    } else {

      commands.unknownArgs(d);
      return false;

    }

    let text = main.commands.cleanContent(args.join(' '));

    if(!text) return commands.unknownArgs(d);

    if(!url.match(/(http(s)?:\/\/)?(www\.)?.+\..+/i) || url.match(/\.(bin|zip|db|psb)$/)) {
      commands.unknownArgs(d);

      return false;
    }

    return {
      url: url,
      text: text
    };

  }

  commands.cleanContent = (message) => {

    if(!message) return '';

    return message.replace(/<@&(\d*)>|<@!(\d*)>|<@(\d*)>|<#(\d*)>/g, function(match, RID, NID, UID, CID) {

      if(UID || CID) {
        if(main.bot.users.has(UID)) return "@" + main.bot.users.get(UID).username;
        if(main.bot.channels.has(CID)) return "#" + main.bot.channels.get(CID).name;
      }

      if(RID || NID) {
        for(server of main.bot.guilds.values()) {
          if(server.roles.has(RID)) return "@" + server.roles.get(RID).name;
          if(server.members.has(NID)) return "@" + server.members.get(NID).nickname;
        }
      }

      if(CID) return '#deleted-channel';
      return '@invalid-user';
    });

  }

  return commands;
});
