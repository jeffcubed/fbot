module.exports = ((main) => {

  return({
    run: ((d) => {

      let message = main.commands.getMessage(d);

      if(!message) return main.commands.unknownArgs(d);

      let rating = 0;
      let rated = 0;

      message.split('').forEach((char) => {

        if(char.charCodeAt() > 65 && char.charCodeAt() < 90) {

          rated++;
          rating += (char.charCodeAt() - 70);

        } else if(char.charCodeAt() > 97 && char.charCodeAt() < 122) {

          rated++;
          rating += (char.charCodeAt() - 102);

        } else if(char.charCodeAt() > 48 && char.charCodeAt() < 57) {

          rated++;
          rating += (char.charCodeAt() - 48);

        } else {

          rating--;

        }

      });

      rating = rating / rated;

      rating = Math.min(Math.max(rating, 0), 10);

      rating = Math.round(rating);

      if(message.match(/(152172984373608449|150745989836308480|138680878539735040|mlp|anime|weeb|senpai|n(igger|egro)|dark skin|j(ew|ude)|furr(y|i)|bron(y|i)|minion|discord\.io)/gi)) rating = 0;

      if(message.match(/(matmen|fbot|254696880120791040|277411860125581312|hitler|nazi|kkk|hydra|discord\.js)/gi)) rating = 10;

      if(message.match(/german|🇩🇪|deutsch/gi)) rating = 'nein';

      d.channel.send('I\'d give *' + message + '* a ' + rating + '/10');

    }),
    description: "Rates the supplied argument",
    args: "(thing to rate..)",
    category: "Fun",
    cooldown: 1000
  });

});
