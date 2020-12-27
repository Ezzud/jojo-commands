'use strict';
const Discord = require("discord.js");
const db = require('quick.db');

   function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }


module.exports.run = async (client, message, args) => {
    if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return(message.channel.send(`:x: Vous n'avez pas la permission`));
    const db = client.db
    const img = client.img
    if(await db.get(`${message.guild.id}-guild.command`) === true) return(message.channel.send(`:x: Merci de bien vouloir patienter avant de lancer une autre commande`));
    if(!message.guild.member(message.author).voice.channel) return(message.channel.send(`:x: Vous n'êtes connecté à aucun channel`));
    await db.set(`${message.guild.id}-guild.command`, true)
    let ch = message.guild.member(message.author).voice.channel
    var embed = new Discord.MessageEmbed()
    .setColor('#2795DC')
    .setImage("https://i.kym-cdn.com/photos/images/newsfeed/000/960/551/555.gif")
    message.channel.send(embed)
    var user = message.guild.member(message.author).voice.channel.members
    await ch.join().then(async connection => {
            await connection.play('./img/cream.mp3');
            await sleep(4000)
    await ch.delete()
    await db.set(`${message.guild.id}-guild.command`, false)
    }).catch(async (err) => {
            console.error(err)
             await ch.leave()
             await db.set(`${message.guild.id}-guild.command`, false)   
        })
}
module.exports.help = {
    name: "cream"
}