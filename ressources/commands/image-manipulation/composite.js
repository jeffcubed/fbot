module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      if(args.length !== 2) return main.commands.unknownArgs(d);

      if(!args[0].match(/(http(s)?:\/\/)?(www\.)?.+\..+/i) || !args[1].match(/(http(s)?:\/\/)?(www\.)?.+\..+/i)) return main.commands.unknownArgs(d);

      Jimp.read(args[0], (err, image) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(image.bitmap.width * image.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read(args[1], (err, image2) => {

          if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

          if(image2.bitmap.width * image2.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

          image2.resize(image.bitmap.width, image.bitmap.height, (err, image2) => {

            if(err) return main.commands.handleError(err, d);

            image2.opacity(0.5, (err, image2) => {

              image.composite(image2, 0, 0, (err, image) => {

                if(err) return main.commands.handleError(err, d);

                image.getBuffer('image/png', (err, res) => {

                  if(err) return main.commands.handleError(err, d);

                  d.channel.send({
                    files: [{
                      attachment: res,
                      name: 'composite.png'
                    }]
                  });

                });

              });

            });

          });

        });

      });

    }),
    description: "Merges two images",
    args: "(URL) (URL)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
