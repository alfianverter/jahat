# Discord.FM Client Tools

### What is Discord.FM?
It's a Discord server that broadcasts music 24/7 and has a song requests system. You should go check it out! https://discord.fm.

### What are these Client Tools and what do they do?
These client tools are a collection of tools for streamers and people who like scrobbling their tracks on Last.FM.

- [x] Real-time now playing data saved to a `.txt` file for streamers
- [ ] Real-time scrobbling to Last.FM (this will be implemented server-side when OAuth2 comes about for Discord)

This client connects to the Discord.FM Websocket through CloudFlare, and can receive data from the music bots and anything else connected to the database.

### Current websockets events
- `song`: broadcasted every time a song is played on any bot.
    Will receive an object with two attributes: `bot` and `song`, where `bot` is the bot's library name and `song` is the name of the new song.
