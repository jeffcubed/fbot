module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let imageAndText = main.commands.getImageAndTextFromMessage(d);

      if(!imageAndText) return;

      let url = imageAndText.url;
      let title = imageAndText.text.substring(0, 28);

      Jimp.read(url, (err, customImage) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(customImage.bitmap.width * customImage.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/yugioh/raw.png', (err, raw) => {

          if(err) return main.commands.handleError(err, d);

          new Jimp(raw.bitmap.width, raw.bitmap.height, 0x000000ff, (err, frame) => {

            if(err) return main.commands.handleError(err, d);

            customImage.resize(370, 365, (err, customImage) => {

              if(err) return main.commands.handleError(err, d);

              frame.composite(customImage, 180, 150, (err, frame) => {

                if(err) return main.commands.handleError(err, d);

                frame.composite(raw, 0, 0, (err, result) => {

                  if(err) return main.commands.handleError(err, d);

                  Jimp.loadFont('./ressources/files/yugioh/yugioh.fnt', (err, font) => {

                    if(err) return main.commands.handleError(err, d);

                    result.print(font, 170, 40, title);

                    result.getBuffer('image/png', (err, res) => {

                      if(err) return main.commands.handleError(err, d);

                      d.channel.send({
                        files: [{
                          attachment: res,
                          name: 'yugioh.png'
                        }]
                      });

                    });

                  });

                });

              });

            });

          });

        });

      });

    }),
    description: "Creates your personal Yu-Gi-Oh! trading card",
    args: "(URL | Attachment | @user) (Title..)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
