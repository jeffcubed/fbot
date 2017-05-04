module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let url = main.commands.getImageFromMessage(d);
      if(!url) return;

      Jimp.read(url, (err, customImage) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(customImage.bitmap.width * customImage.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/mistake.png', (err, raw) => {

          if(err) return main.commands.handleError(err, d);

          raw.resize(Jimp.AUTO, customImage.bitmap.height, (err, raw) => {

            if(err) return main.commands.handleError(err, d);

            customImage.composite(raw, 0, 0, (err, result) => {

              if(err) return main.commands.handleError(err, d);

              result.getBuffer('image/png', (err, res) => {

                if(err) return main.commands.handleError(err, d);

                d.channel.send({
                  files: [{
                    attachment: res,
                    name: 'mistake.png'
                  }]
                });

              });

            });

          });

        });

      });

    }),
    description: "For really big mistakes",
    args: "(URL | Attachment | @user)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
