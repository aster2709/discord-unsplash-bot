const { createApi } = require("unsplash-js");
const Discord = require("discord.js");
const client = new Discord.Client();
const { accessKey, prefix, token } = require("./config.json");
const unsplash = createApi({
  accessKey: accessKey,
});

client.login(token);
