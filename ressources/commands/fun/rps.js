module.exports = ((main) => {

  const matrix = {
    rock: {
      paper: -1,
      scissors: 1,
    },
    paper: {
      scissors: -1,
      rock: 1,
    },
    scissors: {
      rock: -1,
      paper: 1,
    },
    nigger: {
      'white male': -1,
      'anything else': -1,
      matmen: -1,
      'gay people': -1
    }
  };

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      if(args.length !== 1) return main.commands.unknownArgs(d);

      let userChoice = args[0].toLowerCase();

      if(!matrix[userChoice]) return d.channel.send('Invalid choice! Please choose between `rock`, `paper` and `scissors`');

      let userChoiceMatrix = matrix[userChoice];

      let choices = Object.keys(userChoiceMatrix);

      let choice = choices[Math.floor(Math.random() * choices.length)];

      let points = (userChoice === choice) ? 0 : matrix[userChoice][choice];

      switch(points) {
        case 1:
          d.channel.send('Your choice: `' + userChoice + '`\n' +
            'The bot\'s choice: `' + choice + '`\n\n' +
            'You won!');
          break;

        case -1:
          d.channel.send('Your choice: `' + userChoice + '`\n' +
            'The bot\'s choice: `' + choice + '`\n\n' +
            'The bot won!');
          break;

        default:
          d.channel.send('Your choice: `' + userChoice + '`\n' +
            'The bot\'s choice: `' + choice + '`\n\n' +
            'You drew!');
      }

    }),
    description: "Rock Paper Scissors agains the bot!",
    args: "(choice)",
    category: "Fun",
    cooldown: 1000
  });

});
