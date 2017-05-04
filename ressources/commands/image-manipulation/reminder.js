module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let imageAndText = main.commands.getImageAndTextFromMessage(d);

      if(!imageAndText) return;

      let url = imageAndText.url;
      let text = imageAndText.text;

      Jimp.read(url, (err, customImage) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(customImage.bitmap.width * customImage.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/reminder/raw.png', (err, raw) => {

          if(err) return main.commands.handleError(err, d);

          new Jimp(raw.bitmap.width, raw.bitmap.height, 0xffffffff, (err, frame) => {

            if(err) return main.commands.handleError(err, d);

            customImage.resize(325, 325, (err, customImage) => {

              if(err) return main.commands.handleError(err, d);

              frame.composite(customImage, 0, 99, (err, frame) => {

                if(err) return main.commands.handleError(err, d);

                frame.composite(raw, 0, 0, (err, result) => {

                  if(err) return main.commands.handleError(err, d);

                  Jimp.loadFont('./ressources/files/reminder/seguisb.fnt', (err, font) => {

                    if(err) return main.commands.handleError(err, d);

                    text = text.substring(0, 18 * 7).replace(/(^\s+|\s+$)/g, '');

                    text.match(/.{1,18}/g).forEach((part, ln) => {
                      if(ln > 7) return;
                      result.print(font, 370, (200 + 32 * ln), part.replace(/^[^\S\x0a\x0d]+/, ''));
                    });

                    result.getBuffer('image/png', (err, res) => {

                      if(err) return main.commands.handleError(err, d);

                      d.channel.send({
                        files: [{
                          attachment: res,
                          name: 'reminder.png'
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
    description: "Reminder: Anime is not allowed on this server",
    args: "(URL | Attachment | @user) (message.. )",
    category: "Fun",
    cooldown: 1000 * 5
  });
});
