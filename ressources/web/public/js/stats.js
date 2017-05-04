console.time('fetchData');

fetch('/api/stats').then((res) => {
  return res.json();
}).then((stats) => {

  console.timeEnd('fetchData');
  console.time('processData');

  let servers = [];
  let users = [];
  let usersOnline = [];
  let messages = [];
  let commands = [];
  let channels = [];
  let databaseSize = [];

  let commandsPerHundredMessages = [];

  stats.forEach((statsObject) => {

    servers.push({
      x: parseInt(statsObject.time),
      y: parseInt(statsObject.servers)
    });

    users.push({
      x: parseInt(statsObject.time),
      y: parseInt(statsObject.users)
    });

    usersOnline.push({
      x: parseInt(statsObject.time),
      y: parseInt(statsObject.usersonline)
    });

    messages.push({
      x: parseInt(statsObject.time),
      y: parseInt(statsObject.messages)
    });

    commands.push({
      x: parseInt(statsObject.time),
      y: parseInt(statsObject.commands)
    });

    channels.push({
      x: parseInt(statsObject.time),
      y: parseInt(statsObject.channels)
    });

    databaseSize.push({
      x: parseInt(statsObject.time),
      y: parseInt(statsObject.dbsize) / 1000000
    });

    commandsPerHundredMessages.push({
      x: parseInt(statsObject.time),
      y: (parseInt(statsObject.commands) / parseInt(statsObject.messages) * 100)
    });

  });

  console.timeEnd('processData');
  console.log('Processed ' + stats.length + ' stats objects');

  let graphOpts = {
    scales: {
      xAxes: [{
        type: 'time'
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0
      }
    },
    hover: {
      mode: 'x',
      intersect: false
    }
  };

  new Chart('serversCanvas', {
    type: 'line',
    data: {
      datasets: [{
        label: 'Servers',
        data: servers,
        backgroundColor: 'rgba(255, 0, 0, 0.3)'
      }]
    },
    options: graphOpts
  });

  new Chart('usersCanvas', {
    type: 'line',
    data: {
      datasets: [{
        label: 'Users',
        data: users,
        backgroundColor: 'rgba(0, 255, 0, 0.3)'
      }, {
        label: 'Users Online',
        data: usersOnline,
        backgroundColor: 'rgba(0, 255, 128, 0.3)'
      }]
    },
    options: graphOpts
  });

  new Chart('messagesCanvas', {
    type: 'line',
    data: {
      datasets: [{
        label: 'Messages Received',
        data: messages,
        backgroundColor: 'rgba(255, 128, 0, 0.3)'
      }]
    },
    options: graphOpts
  });

  new Chart('commandsCanvas', {
    type: 'line',
    data: {
      datasets: [{
        label: 'Commands Received',
        data: commands,
        backgroundColor: 'rgba(255, 255, 0, 0.3)'
      }]
    },
    options: graphOpts
  });

  new Chart('commandsPerHundredMessagesCanvas', {
    type: 'line',
    data: {
      datasets: [{
        label: 'Commands per 100 messages',
        data: commandsPerHundredMessages,
        backgroundColor: 'rgba(196, 64, 64, 0.3)'
      }]
    },
    options: graphOpts
  });

  new Chart('databaseSize', {
    type: 'line',
    data: {
      datasets: [{
        label: 'Database size in MB',
        data: databaseSize,
        backgroundColor: 'rgba(64, 128, 128, 0.3)'
      }]
    },
    options: graphOpts
  });

});
