module.exports = ((main) => {

  return({
    run: ((d) => {

      if(!d.member.hasPermission('MANAGE_MESSAGES')) return d.channel.send('Sorry, but you need the `MANAGE_MESSAGES` permission to execute this command!');
      if(!d.guild.members.get(main.bot.user.id).hasPermission('MANAGE_MESSAGES')) return d.channel.send('Sorry, but I don\'t have permission to delete messages here!');

      let args = main.commands.getArgs(d);

      if(args.length === 1 && args[0].match(/\d+/)) {

        let count = parseInt(args[0]);

        count = Math.max(Math.min(count, 100), 2);

        d.channel.fetchMessages({
            limit: count
          })
          .then((messages) => {

            d.channel.bulkDelete(messages)
              .then((res) => d.channel.send('Deleted `' + (res.size || 0) + '` messages'))
              .catch((err) => d.channel.send('Error deleting messages: `' + err.message + '`'));

          })
          .catch((err) => d.channel.send('Failed to fetch messages: `' + err.message + '`'));

      } else if(args.length === 2 && args[0].match(/\d+/) && d.mentions.users.first()) {

        let user = d.mentions.users.first();

        let count = parseInt(args[0]);
        count = Math.max(Math.min(count, 100), 2);

        d.channel.fetchMessages({
            limit: 100
          }).then((messages) => {
            let arr = messages.filter((m) => m.author.id === user.id)
              .array().reverse().slice(0, count);

            d.channel.bulkDelete(arr)
              .catch((err) => d.channel.send('Error deleting messages: `' + err.message + '`'))
              .then((res) => d.channel.send('Deleted `' + (res.size || 0) + '` messages from `' + user.tag + '`'));
          })
          .catch((err) => d.channel.send('Failed to fetch messages: `' + err.message + '`'))

      } else main.commands.unknownArgs(d);

    }),
    description: "Purges the last (count) messages of [user]",
    category: "Utilities",
    args: "(count) [@user]"
  });

});
