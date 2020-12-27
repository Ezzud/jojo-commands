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
    .setImage("https://media1.tenor.com/images/5fdea37001d04d8159246a435efd4c00/tenor.gif?itemid=7376337")
    message.channel.send(embed)
    var user = message.guild.member(message.author).voice.channel.members
    var channel = message.guild.channels.cache.find(x => x.name === "BTD")
    if(!channel) {
        await message.guild.channels.create('BTD', {
            type: 'voice',
            permissionOverwrites: [
            {
              id: message.guild.roles.everyone,
              deny: ['VIEW_CHANNEL', `SPEAK`],
              allow: ['CONNECT']
            },
            ],
}).then(ch => {
    channel = ch
})
    }
    await ch.join().then(async connection => {
            await connection.play('./img/killerqueen.mp3', {volume: 0.60});
            await sleep(5000)
    }).catch(async (err) => {
            console.error(err)
             await ch.leave()
             await db.set(`${message.guild.id}-guild.command`, false)   
        })
    await user.forEach(async user => {
        if(user.id === message.author.id || user.id === client.user.id) return(console.log('Not Mutable'));
        await user.voice.setChannel(channel).catch(async (err) => {
            console.error(err)
             await ch.leave()
             await db.set(`${message.guild.id}-guild.command`, false)   
        })
    })
    await sleep(8000)
    await user.forEach(async user => {
        if(user.id === message.author.id || user.id === client.user.id) return(console.log('Not Kickable'));
        await user.voice.setChannel(ch).catch(async (err) => {
            console.error(err)
             await ch.leave()
             await db.set(`${message.guild.id}-guild.command`, false)   
        })
    })
    await sleep(4000)
    await ch.leave()
    await channel.delete().catch(async (err) => {
            console.error(err)
             await ch.leave()
             await db.set(`${message.guild.id}-guild.command`, false)   
        })
    await db.set(`${message.guild.id}-guild.command`, false)
}
module.exports.help = {
    name: "killerqueen"
}