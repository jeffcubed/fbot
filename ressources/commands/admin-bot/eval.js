module.exports = ((main) => {

  return({
    run: ((d) => {

      let returnMessage;
      let isError = false;
      let isFormatted = false;

      try {

        returnMessage = eval(main.commands.getMessage(d));

      } catch(err) {

        isError = true;
        returnMessage = err.toString();

      } finally {

        if(typeof returnMessage === 'undefined') {

          returnMessage = '```undefined```';

        } else if(typeof returnMessage === 'object') {

          try {
            returnMessage = '```json\n' + JSON.stringify(returnMessage, null, 4) + '```';
          } catch(err) {
            returnMessage = '```Error converting JSON result to string:\n' + err.toString() + '```';
          }

        } else {

          returnMessage = '```\n' + returnMessage + '```';

        }

        if(returnMessage.length > 1980) returnMessage = (returnMessage.substring(0, 1950) + '...```');

        d.channel.send((isError ? 'Error:\n' : '') + returnMessage);

      }

    }),
    description: "Evaluates code serverside",
    category: "Botadmin",
    args: "(code..)",
    adminOnly: true
  });

});
