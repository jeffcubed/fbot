module.exports = ((main) => {

  let startTime = Date.now();

  let eventFiles = main.fs.readdirSync('./ressources/events/');

  let loadedEvents = [];

  eventFiles.forEach((fileName) => {
    loadedEvents.push(fileName.split('.')[0]);
    require(main.path.resolve('./ressources/events/', fileName))(main);
  });

  console.log('[EVENTS] '.yellow + 'Loaded ' + eventFiles.length + ' events ' + ('[' + (Date.now() - startTime) + 'ms]').yellow);

  return loadedEvents;

});
