module.exports = ((main) => {

  const Jimp = main.jimp;

  return({
    run: ((d) => {

      let username = encodeURIComponent(d.author.username);
      let title = encodeURIComponent(main.commands.getMessage(d).substring(0, 24));

      if(!title) return main.commands.unknownArgs(d);

      let url = 'https://orly-appstore.herokuapp.com/generate?title=' + title +
        '&top_text=generated%20by%20fbot&author=' + username +
        '&image_code=' + Math.ceil(Math.random() * 40) +
        '&theme=' + Math.floor(Math.random() * 17) +
        '&guide_text=The%20Definitive%20Guide&guide_text_placement=bottom_right';

      d.channel.send({
        files: [{
          attachment: 'https://orly-appstore.herokuapp.com/generate?title=' + title +
            '&top_text=generated%20by%20fbot&author=' + username +
            '&image_code=' + Math.ceil(Math.random() * 40) +
            '&theme=' + Math.floor(Math.random() * 17) +
            '&guide_text=The%20Definitive%20Guide&guide_text_placement=bottom_right',
          name: 'orly.png'
        }]
      });

    }),
    description: "Generates an O RLY book cover",
    args: "(title..)",
    category: "Fun",
    cooldown: 1000 * 5
  });

});
