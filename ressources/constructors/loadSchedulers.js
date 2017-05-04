module.exports = ((main) => {

  let startTime = Date.now();

  var tasks = {};

  let taskFiles = main.fs.readdirSync('./ressources/tasks/');

  taskFiles.forEach((fileName) => {

    let name = fileName.split('.')[0];

    tasks[name] = require(main.path.resolve('./ressources/tasks/', fileName))(main);

    setInterval(tasks[name].run, tasks[name].interval);

    if(tasks[name].runOnStart) tasks[name].run();

  });

  console.log('[SCHEDULERS] '.green + 'Loaded ' + taskFiles.length + ' tasks ' + ('[' + (Date.now() - startTime) + 'ms]').yellow);

  return tasks;
});
