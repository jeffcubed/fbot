module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let url = main.commands.getImageFromMessage(d);
      if(!url) return;

      Jimp.read(url, (err, image) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(image.bitmap.width * image.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/swast.png', (err, swast) => {

          if(err) return main.commands.handleError(err, d);

          swast.resize(Math.max(image.bitmap.width, image.bitmap.height), Jimp.AUTO, Jimp.RESIZE_BILINEAR, (err, swast) => {

            if(err) return main.commands.handleError(err, d);

            image.composite(swast, (image.bitmap.width / 2 - swast.bitmap.width / 2), (image.bitmap.height / 2 - swast.bitmap.height / 2), (err, image) => {

              if(err) return main.commands.handleError(err, d);

              image.getBuffer('image/png', (err, res) => {

                if(err) return main.commands.handleError(err, d);

                d.channel.send({
                  files: [{
                    attachment: res,
                    name: 'swastika.png'
                  }]
                });

              });

            });

          });

        });

      });

    }),
    description: "Overlays a swastika over the given argument",
    args: "(URL | Attachment | @user)",
    category: "Fun",
    aliases: ["nazi"],
    cooldown: 1000 * 5
  });

});
