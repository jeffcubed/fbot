module.exports = ((main) => {

  return({
    run: ((d) => {

      main.child_process.exec(main.commands.getMessage(d), (err, stdout, stderr) => {

        if(err) {
          let returnMessage = (typeof err === 'object') ? (err.toString() + '\n' + JSON.stringify(err)) : err.toString();
          if(returnMessage.length > 1980) returnMessage = (returnMessage.substring(0, 1950) + '...');

          d.channel.send('```' + returnMessage + '```');

          return;
        }

        if(stdout.length > 900) stdout = (stdout.substring(0, 850) + '...');
        if(stderr.length > 900) stderr = (stderr.substring(0, 850) + '...');

        d.channel.send('`STDOUT`\n```\n' + (stdout || 'None') + '```\n\n`STDERR`\n```\n' + (stderr || 'None') + '```');

      });

    }),
    description: "Executes a command line command serverside",
    category: "Botadmin",
    args: "(code..)",
    adminOnly: true
  });

});
