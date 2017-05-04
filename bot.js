require('colors');

console.log('[MAIN] '.cyan + 'Setting up bot..\n');

process.on('unhandledRejection', () => {});

process.on('unhandledException', (e) => {
  console.log('[MAIN] '.cyan + ('Unhandled Exception:\n' + e).bgRed);
});

var cvars = {
  colors: {
    info: 0x00ccff,
    success: 0x00cc33,
    danger: 0xcc3300
  },

  ready: false,
  defaultErrorMessage: "Oh no! There was an error executing your command",
  noPermsMessage: 'You don\'t have permission to execute this command',
  maxImageSize: 5000 * 5000,
  startTime: Date.now(),
  lastHeartbeatAt: Date.now(),

  currentVoiceChannels: {},
  commandCooldowns: {},
  indexedServers: [],

  fs: require('fs'),
  path: require('path'),
  api: require('discord.js'),
  child_process: require('child_process'),
  hd: require('humanize-duration'),
  req: require('request'),
  jimp: require('jimp'),
  speedtest: require('speedtest-net'),
};

cvars.cfg = require('./ressources/configs/bot.json');

if(process.argv.indexOf('prepare') !== -1) return require('./ressources/constructors/prepareDatabase.js')(cvars);

cvars.logger = require('./ressources/constructors/logger.js')(cvars);
cvars.pgPool = require('./ressources/constructors/setupPG.js')(cvars);

cvars.aiFilterWordbase = require('./ressources/constructors/aiFilterWordbase.js');
cvars.aiFilter = require('./ressources/constructors/aiFilter.js')(cvars);

cvars.bot = require('./ressources/constructors/runBotInstance.js')(cvars);
cvars.events = require('./ressources/constructors/loadEvents.js')(cvars);
cvars.commands = require('./ressources/constructors/loadCommands.js')(cvars);
cvars.schedulers = require('./ressources/constructors/loadSchedulers.js')(cvars);

require('./ressources/web/webHelper.js')(cvars);

cvars.bot.login(cvars.cfg.token);

setTimeout(() => {

  if(cvars.ready) return;

  console.log('\n[MAIN] '.cyan + 'Bot didnt start up in time, killing it..'.bgRed);
  process.exit(1);

}, 10000);
