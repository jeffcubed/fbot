module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let url = main.commands.getImageFromMessage(d);
      if(!url) return;

      Jimp.read(url, (err, image) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(image.bitmap.width * image.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/ifunny.png', (err, ifunny) => {

          if(err) return main.commands.handleError(err, d);

          ifunny.resize(image.bitmap.width, Jimp.AUTO, (err, ifunny) => {

            if(err) return main.commands.handleError(err, d);

            image.composite(ifunny, 0, (image.bitmap.height - ifunny.bitmap.height), (err, image) => {

              if(err) return main.commands.handleError(err, d);

              image.getBuffer('image/png', (err, res) => {

                if(err) return main.commands.handleError(err, d);

                d.channel.send({
                  files: [{
                    attachment: res,
                    name: 'ifunny.png'
                  }]
                });

              });

            });

          });

        });

      });

    }),
    description: "Adds the ifunny logo to the given argument",
    args: "(URL | Attachment | @user)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
