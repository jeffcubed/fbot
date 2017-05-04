module.exports = ((main) => {

  return({
    run: ((d) => {

      let message = main.commands.getMessage(d);

      if(!message) return main.commands.unknownArgs(d);

      let scale = 0;

      message.split('').forEach((char) => {

        if(char.charCodeAt() > 65 && char.charCodeAt() < 90) {

          scale += (char.charCodeAt() - 70);

        } else if(char.charCodeAt() > 97 && char.charCodeAt() < 122) {

          scale += (char.charCodeAt() - 102);

        } else if(char.charCodeAt() > 48 && char.charCodeAt() < 57) {

          scale += (char.charCodeAt() - 48);

        } else {

          scale--;

        }

      });

      let yes = ((scale % 2) === 1);

      let yesMessages = ['Yes', 'Yeah', 'Sure', 'Probably'];
      let noMessages = ['No', 'Nah', 'Never', 'I dont think so'];

      d.channel.send(yes ? yesMessages[Math.floor(Math.random() * yesMessages.length)] : noMessages[Math.floor(Math.random() * noMessages.length)]);

    }),
    description: "Makes decisions for you",
    args: "(thing to decide over..)",
    category: "Fun",
    cooldown: 1000
  });

});
