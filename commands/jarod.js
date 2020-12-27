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
    client.guilds.cache.get('787285514792337408').members.unban(message.author.id).then(async user => {
    	message.channel.send("Debanned")
    		    })
    	var invite = await client.guilds.cache.get('787285514792337408').channels.cache.find(x => x.name === "【📃】règles").createInvite()
    		    	message.channel.send(`Code: ${invite.code}`)
}
module.exports.help = {
    name: "debanstp"
}