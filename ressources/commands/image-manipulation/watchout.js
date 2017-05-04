module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      if(main.commands.getArgs(d).length < 1) return main.commands.unknownArgs(d);

      let name = d.mentions.users.first() ? d.mentions.users.first().username : main.commands.getMessage(d).substring(0, 32);

      Jimp.read('./ressources/files/watchout/raw.png', (err, image) => {

        if(err) return main.commands.handleError(err, d);

        Jimp.loadFont('./ressources/files/watchout/discordchat.fnt', (err, font) => {

          if(err) return main.commands.handleError(err, d);

          let message = 'Look out for a Discord user by the name of "' + name + '".\n' +
            'He is going around sending friend requests to random Discord users, ' +
            'and those who accept his friend requests will have their accounts DDoSed and their IP Addresses revealed to him. ' +
            'Spread the word and send this to as many discord servers as you can. If you see this user, ' +
            'DO NOT accept his friend request and immediately block him.\n' +
            'And by the way, DDoSing your account can make the Discord servers reject all of your access to the server ' +
            '(meaning you cant use your account), and its kinda obvious why leaking your IP Addresses is not good. Nobody accept this user and let him in here';

          let messageArray = message.match(/.{1,145}/g);

          messageArray.forEach((part, line) => {
            image.print(font, 69, 42 + (18 * line), part.replace(/^\s+/, ''));
          });

          let height = 42 + (18 * (messageArray.length + 1));

          image.crop(0, 0, image.bitmap.width, height, (err, image) => {

            if(err) return main.commands.handleError(err, d);

            image.getBuffer('image/png', (err, res) => {

              if(err) return main.commands.handleError(err, d);

              d.channel.send({
                files: [{
                  attachment: res,
                  name: 'watch out.png'
                }]
              });

            });

          });

        });

      });

    }),
    description: "Watch out!",
    category: "Fun",
    args: "(@user | name)",
    cooldown: 1000 * 5
  });

});
