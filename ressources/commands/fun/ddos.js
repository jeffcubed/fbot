module.exports = ((main) => {

  const wait = (time) => {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  };

  const react = async function(d, ip) {

    let message = await d.channel.send('DDoSing `' + ip + '`: `PINGING.`');
    await wait(2000);
    message = await message.edit('DDoSing `' + ip + '`: `PINGING .`');
    await wait(2000);
    message = await message.edit('DDoSing `' + ip + '`: `PING ' + Math.round(Math.random() * 50 + 10) + 'ms`');
    await wait(1000);
    message = await message.edit('DDoSing `' + ip + '`: `WHOIS .`');
    await wait(2000);
    message = await message.edit('DDoSing `' + ip + '`: `WHOIS .`');
    await wait(2000);
    message = await message.edit('DDoSing `' + ip + '`: `WHOIS .`');
    await wait(2000);
    message = await message.edit('DDoSing `' + ip + '`: `WHOIS DONE`');
    await wait(1000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING PACKETS.. 0%`');
    await wait(5000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING PACKETS.. 27%`');
    await wait(5000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING PACKETS.. 38%`');
    await wait(5000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING PACKETS.. 52%`');
    await wait(5000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING PACKETS.. 78%`');
    await wait(5000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING PACKETS.. 97%`');
    await wait(5000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING PACKETS.. DONE`');
    await wait(1000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING SELF EXECUTING CODE.. 0%`');
    await wait(2000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING SELF EXECUTING CODE.. 93%`');
    await wait(2000);
    message = await message.edit('DDoSing `' + ip + '`: `SENDING SELF EXECUTING CODE.. DONE`');
    await wait(1000);
    message = await message.edit('DDoSing `' + ip + '`: `SOLVING SECURITY HASH..`');
    await wait(5000);
    message = await message.edit('DDoSing `' + ip + '`: `SOLVING SECURITY HASH.. DONE`');
    await wait(1000);
    message = await message.edit('DDoSing `' + ip + '`: `PASSWORD FOUND: ' + Math.floor(Math.random() * Math.pow(100, 10)).toString(16) + '`');

  };

  return({
    run: ((d) => {

      let args = main.commands.getArgs(d);

      if(args.length === 1 && args[0].match(/^(\d{1,3}(\.|$)){4}/)) {

        let ip = args[0];

        react(d, ip);

      } else main.commands.unknownArgs(d);

    }),
    description: "DDoSes the given IP",
    args: "(IP)",
    category: "Fun",
    cooldown: 1000 * 30
  });

});
