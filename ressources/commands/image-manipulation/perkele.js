 module.exports = ((main) => {

   const Jimp = main.jimp;

   return({
     run: ((d) => {

       let url = main.commands.getImageFromMessage(d);
       if(!url) return;

       Jimp.read(url, (err, image) => {

         if(err) return d.channel.send('There was an error loading the image (maybe you supplied an invalid URL?)');

         if(image.bitmap.width * image.bitmap.height > main.maxImageSize) return d.channel.send('That\'s too big for me to handle ( ͡° ͜ʖ ͡°)');

         Jimp.read('./ressources/files/perkele.png', (err, perkele) => {

           if(err) return main.commands.handleError(err, d);

           perkele.resize(image.bitmap.width, image.bitmap.height, Jimp.RESIZE_BILINEAR, (err, perkele) => {

             if(err) return main.commands.handleError(err, d);

             image.composite(perkele, 0, 0, (err, image) => {

               if(err) return main.commands.handleError(err, d);

               image.getBuffer('image/png', (err, res) => {

                 if(err) return main.commands.handleError(err, d);

                 d.channel.send({
                   files: [{
                     attachment: res,
                     name: 'perkele.png'
                   }]
                 });

               });

             });

           });

         });

       });

     }),
     description: "Overlays the finnish flag over the given argument",
     args: "(URL | Attachment | @user)",
     category: "Fun",
     cooldown: 1000 * 5
   });

 });
