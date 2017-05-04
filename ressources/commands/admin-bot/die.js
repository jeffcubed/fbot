module.exports = ((main) => {

  return({
    run: ((d) => {

      d.channel.send('goodnight').then(() => {
        process.emit("SIGTERM");
      });

    }),
    description: "Kills the bot (quite gently though, dw) :v",
    category: "Botadmin",
    adminOnly: true
  });

});
