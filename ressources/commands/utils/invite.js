module.exports = ((main) => {

  return({
    run: ((d) => {

      d.channel.send('You can invite me to your server using this url:\n' +
        'http://bit.ly/add-fbot\n\n' +
        'Uncheck the Administrator permission, if you don\'t need administration, moderation and the tempchannel command\n\n' +
        'Also, you can join the bot\'s discord server here:\n' +
        'https://discord.gg/aRt6zMU');

    }),
    description: "Replies with an invitation URL for the bot",
    category: "Utilities",
    aliases: ["info"]
  });

});
