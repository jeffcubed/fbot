module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let url = main.commands.getImageFromMessage(d);
      if(!url) return;

      Jimp.read(url, (err, image) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(image.bitmap.width * image.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        image.quality(1, (err, image) => {

          if(err) return main.commands.handleError(err, d);

          image.getBuffer('image/jpeg', (err, res) => {

            if(err) return main.commands.handleError(err, d);

            d.channel.send({
              files: [{
                attachment: res,
                name: 'jpeg.png'
              }]
            });

          });

        });

      });

    }),
    description: "Makes the given argument... better.",
    args: "(URL | Attachment | @user)",
    category: "Fun",
    aliases: ["jpg"],
    cooldown: 1000 * 5
  });

});
