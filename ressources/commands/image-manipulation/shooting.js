module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      var message = main.commands.getCleanMessage(d);

      if(!message) return main.commands.unknownArgs(d);

      Jimp.read('./ressources/files/shooting/raw.png', (err, image) => {

        if(err) return main.commands.handleError(err, d);

        Jimp.loadFont('./ressources/files/shooting/seguisb.fnt', (err, font) => {

          if(err) return main.commands.handleError(err, d);

          message = message.substring(0, 22 * 5).replace(/(^\s+|\s+$)/g, '');

          message.match(/.{1,22}/g).forEach((part, ln) => {
            if(ln > 5) return;
            image.print(font, 440, (455 + 24 * ln), part.replace(/^[^\S\x0a\x0d]+/, ''));
          });

          image.getBuffer('image/png', (err, res) => {

            if(err) return main.commands.handleError(err, d);

            d.channel.send({
              files: [{
                attachment: res,
                name: 'shooting.png'
              }]
            });

          });

        });

      });

    }),
    description: "Top causes of mass shootings",
    category: "Fun",
    args: "(text..)",
    aliases: ["mass"],
    cooldown: 1000 * 5
  });

});
