// Require Node.js modules
var fs = require('fs');
var path = require('path');
var WebSocket = require('ws');

// Require configuration
var config = require('./config.json');
var musicbot = config['music-bot'];

// Get path to song file
var songfile = path.join(__dirname, 'nowplaying.txt');
fs.writeFileSync(songfile, 'Unknown Artist - Untitled Track', 'utf8');

// Setup events for Socket server
var socket = new WebSocket('wss://sockets.discord.fm');
socket.on('open', function () {
  console.log('Connected to sockets server! Listening for events...');
})
.on('message', function (data) {
  if (data === 'helo') return console.log('got HELO event! connection was successful!');
  data = JSON.parse(data);

  if (data.event === 'play' && data.data.bot === musicbot) {
    // We got a play, lets save it into the file.
    console.log('Now playing: ' + data.data.song.title);

    // Synchronously saving to the file because we don't need async
    fs.writeFileSync(songfile, data.data.song.title, 'utf8');
  }
})
.on('error', function (err) {
  console.log('Houston, we have a problem...');
  console.error(err);
  console.error(err.stack);
})
.on('close', function () {
  console.log('Disconnected from the Socket server.');
});
