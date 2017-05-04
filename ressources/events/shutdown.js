module.exports = ((main) => {

  var shutdown = () => {

    process.exit(0);

  }

  process.on('SIGTERM', shutdown);

  //Windows SIGTERM equiv (thanks, windows)
  if(process.platform === "win32") {
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.on("SIGINT", () => {
      process.emit("SIGTERM");
    });
  }

});
