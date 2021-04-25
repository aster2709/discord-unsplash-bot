const { createApi } = require("unsplash-js");
const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client();
const { accessKey, prefix, token } = require("./config.json");
global.fetch = fetch;
const unsplash = createApi({
  accessKey: accessKey,
});
client.once("ready", () => {
  console.log("Ready");
});
client.on("message", (msg) => {
  if (msg.content.startsWith(`${prefix}`)) {
    const keyword = msg.content.match(/[a-zA-Z]+/);
    unsplash.photos
      .getRandom({
        query: keyword,
      })
      .then((res) => {
        if (res.errors) {
          console.log(`error occured for keyword ${keyword}: ${res.errors[0]}`);
          msg.channel.send(
            `Ran into a problem, please try with another keyword`
          );
        } else {
          const img = res.response;
          msg.channel.send(
            new Discord.MessageEmbed()
              .setColor("#0099ff")
              .setTitle(`Photo by ${img.user.name} on Unsplash`)
              .setURL(`${img.links.download}`)
              .setImage(img.urls.thumb)
          );
        }
      });
  }
});
client.login(token);
