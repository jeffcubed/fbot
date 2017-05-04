module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      var message = main.commands.getCleanMessage(d);

      if(!message) {
        var invalidArgsImg = main.fs.readFileSync('./ressources/files/hacker/invalidargs.png');

        d.channel.send({
          files: [{
            attachment: invalidArgsImg,
            name: 'git gud mate.png'
          }]
        });
        return;
      }

      Jimp.read('./ressources/files/hacker/raw.png', (err, image) => {

        if(err) return main.commands.handleError(err, d);

        Jimp.loadFont('./ressources/files/hacker/ubuntu.fnt', (err, font) => {

          if(err) return main.commands.handleError(err, d);

          message = message.substring(0, 32 * 15).replace(/(^\s+|\s+$)/g, '');

          message.match(/.{1,32}/g).forEach((part, ln) => {
            if(ln > 15) return;
            image.print(font, 220, (260 + 12 * ln), part.replace(/^[^\S\x0a\x0d]+/, ''));
          });

          image.getBuffer('image/png', (err, res) => {

            if(err) return main.commands.handleError(err, d);

            d.channel.send({
              files: [{
                attachment: res,
                name: 'hacked.png'
              }]
            });

          });

        });

      });

    }),
    description: "gets you hacked (seriously, dont try it)",
    category: "Fun",
    args: "(text..)",
    aliases: ["hack"],
    cooldown: 1000 * 5
  });

});
