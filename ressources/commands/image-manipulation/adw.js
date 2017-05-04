module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let url = main.commands.getImageFromMessage(d);
      if(!url) return;

      Jimp.read(url, (err, customImage) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(customImage.bitmap.width * customImage.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/adw.png', (err, raw) => {

          if(err) return main.commands.handleError(err, d);

          new Jimp(raw.bitmap.width, raw.bitmap.height, 0x000000ff, (err, frame) => {

            if(err) return main.commands.handleError(err, d);

            customImage.resize(128, 128, (err, customImage) => {

              if(err) return main.commands.handleError(err, d);

              frame.composite(customImage, 384, 114, (err, frame) => {

                if(err) return main.commands.handleError(err, d);

                frame.composite(raw, 0, 0, (err, result) => {

                  if(err) return main.commands.handleError(err, d);

                  result.getBuffer('image/png', (err, res) => {

                    if(err) return main.commands.handleError(err, d);

                    d.channel.send({
                      files: [{
                        attachment: res,
                        name: 'trash.png'
                      }]
                    });

                  });

                });

              });

            });

          });

        });

      });

    }),
    description: "Taking out the trash",
    args: "(URL | Attachment | @user)",
    aliases: ["walk"],
    category: "Fun",
    cooldown: 1000 * 5
  });

});
