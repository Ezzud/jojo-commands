'use strict';
const Discord = require("discord.js");
const db = require('quick.db');
const fs = require('fs')
const path = require('path')
const wavConverter = require('wav-converter')

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
    .setColor('#C8BB20')
    .setImage("https://i.skyrock.net/0150/107060150/pics/3324929386_1_2_c94QOY6Q.gif")
    message.channel.send(embed)
    var user = message.guild.member(message.author).voice.channel.members
    await ch.join().then(async connection => {
            await connection.play('./img/ge.mp3');
            await sleep(3500)
			const voiceStream = connection.receiver.createStream(message.guild.member(message.author), {
			mode: 'pcm',
			end: 'manual'
		});
		const writeStream = await fs.createWriteStream(`./${message.author.id}.raw_pcm`);
		voiceStream.pipe(writeStream);
		voiceStream.on('close', () => {
			writeStream.end(err => {
				if (err) {
					console.error(err);
				}
			});
		});
		console.log('Recorded')
		await sleep(2000)
		console.log('Destroy')
		await voiceStream.destroy();
		await writeStream.end();
		await sleep(1000)
		console.log('Playing')
		await connection.play(`./${message.author.id}.raw_pcm`, { type: 'unknown' })
		await sleep(4000)
            console.log("sENDED")
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
    name: "goldenexperience"
}