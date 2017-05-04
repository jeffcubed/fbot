module.exports = ((main) => {

  require('./createTables.js')(main);

  return new main.api.Client({
    messageCacheLifetime: 15 * 60,
    messageSweepInterval: 5 * 60,
    fetchAllMembers: true,
    disableEveryone: true
  });

});
