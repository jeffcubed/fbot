module.exports = ((main) => {

  main.bot.on('messageReactionAdd', (reaction, user) => {

    if(main.cfg.botAdmins.includes(user.id)) {

      if(reaction.emoji.name === '❌') {
        reaction.message.delete();
      }

    }

  });

});
