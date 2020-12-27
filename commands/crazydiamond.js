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
    const ch = message.guild.member(message.author).voice.channel
    var embed = new Discord.MessageEmbed()
    .setColor('#2795DC')
    .setImage("https://i.imgur.com/SHF8RWD.gif?noredirect")
    message.channel.send(embed)
    var channels = message.guild.channels.cache;
    const list = []
    await channels.forEach(async ch => {
        if(ch.type !== 'voice') return;
        if(!ch.members) return(console.log(`${ch.name} No User`));
        let mb = ch.members
        await mb.forEach(async membre => {
            await list.push(membre)
            console.log(`Added ${membre.user.tag}`)
        })

    })
    await ch.join().then(async connection => {
            await connection.play('./img/crazydiamond.mp3');
            await sleep(3000)
            await connection.play('./img/dora.mp3');
    await list.forEach(async user => {
    	if(user.id === message.author.id || user.id === client.user.id) return(console.log('Not Mutable'));
    	await user.voice.setChannel(ch)
    }).catch(async (err) => {
            console.error(err)
             await ch.leave()
             await db.set(`${message.guild.id}-guild.command`, false)   
        })

    }).catch(async (err) => {
            console.error(err)
             await ch.leave()
             await db.set(`${message.guild.id}-guild.command`, false)   
        })
    await sleep(5000)
    await ch.leave()
    await db.set(`${message.guild.id}-guild.command`, false)
}
module.exports.help = {
    name: "crazydiamond"
}