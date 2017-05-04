module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let imageAndText = main.commands.getImageAndTextFromMessage(d);

      if(!imageAndText) return;

      let url = imageAndText.url;
      let title = imageAndText.text;

      Jimp.read(url, (err, customImage) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(customImage.bitmap.width * customImage.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/pornhub/raw.png', (err, raw) => {

          if(err) return main.commands.handleError(err, d);

          new Jimp(raw.bitmap.width, raw.bitmap.height, 0x000000ff, (err, frame) => {

            if(err) return main.commands.handleError(err, d);

            customImage.resize(Jimp.AUTO, 550, (err, customImage) => {

              if(err) return main.commands.handleError(err, d);

              frame.composite(customImage, (frame.bitmap.width / 2 - customImage.bitmap.width / 2), 114, (err, frame) => {

                if(err) return main.commands.handleError(err, d);

                frame.composite(raw, 0, 0, (err, result) => {

                  if(err) return main.commands.handleError(err, d);

                  Jimp.loadFont('./ressources/files/pornhub/calibri.fnt', (err, font) => {

                    if(err) return main.commands.handleError(err, d);

                    result.print(font, 26, 670, title);

                    result.getBuffer('image/png', (err, res) => {

                      if(err) return main.commands.handleError(err, d);

                      d.channel.send({
                        files: [{
                          attachment: res,
                          name: 'pornhub.png'
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
    description: "Your favorite porn with the click of a button",
    args: "(URL | Attachment | @user) (Title..)",
    category: "Fun",
    cooldown: 1000 * 5
  });
});
