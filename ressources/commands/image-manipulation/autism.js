module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let url = main.commands.getImageFromMessage(d);
      if(!url) return;

      Jimp.read(url, (err, customImage) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(customImage.bitmap.width * customImage.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/autism.png', (err, raw) => {

          if(err) return main.commands.handleError(err, d);

          customImage.resize(491, 491, (err, customImage) => {

            if(err) return main.commands.handleError(err, d);

            raw.composite(customImage, 0, 0, (err, result) => {

              if(err) return main.commands.handleError(err, d);

              result.getBuffer('image/png', (err, res) => {

                if(err) return main.commands.handleError(err, d);

                d.channel.send({
                  files: [{
                    attachment: res,
                    name: 'autism.png'
                  }]
                });

              });

            });

          });

        });

      });

    }),
    description: "Your autism level has increased",
    args: "(URL | Attachment | @user)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
