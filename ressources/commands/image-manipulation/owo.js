module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let url = main.commands.getImageFromMessage(d);
      if(!url) return;

      if(url.includes('277411860125581312') && url.includes('avatar')) return d.channel.send('https://cdn.discordapp.com/attachments/156114525232431104/306775222760112130/unknown.png');

      Jimp.read(url, (err, customImage) => {

        if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

        if(customImage.bitmap.width * customImage.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

        Jimp.read('./ressources/files/owo.png', (err, raw) => {

          if(err) return main.commands.handleError(err, d);

          customImage.resize(486, 281, (err, customImage) => {

            if(err) return main.commands.handleError(err, d);

            raw.composite(customImage, 96, 47, (err, result) => {

              if(err) return main.commands.handleError(err, d);

              result.getBuffer('image/png', (err, res) => {

                if(err) return main.commands.handleError(err, d);

                d.channel.send({
                  files: [{
                    attachment: res,
                    name: 'owo.png'
                  }]
                });

              });

            });

          });

        });

      });

    }),
    description: "OwO",
    args: "(URL | Attachment | @user)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
