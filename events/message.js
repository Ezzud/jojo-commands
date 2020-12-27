'use strict';
const Discord = require('discord.js')
const sugg = new Set();
const fs = require('fs');
const prefix = "jojo!";
module.exports = async (client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    const db = client.db
    if(message.content === "<@!787093743912091668>" || message.content === "<@787093743912091668>") {
    let emoji = client.emojis.cache.get('732581319678361662')
        var embed = new Discord.MessageEmbed()
        .setTitle(`${emoji} Aide`)
            .setThumbnail(client.user.avatarURL)
            .setDescription('Renseignez-vous sur les commandes du bot')
            .setColor('#6DC61E')
            .addField(`:loud_sound: Commande en vocal`, `\`jojo!zawarudo\` - Mute tout les membres d'un vocal\n\`jojo!zahando\` - Déconnecter tout les utilisateurs d'un vocal\n\`jojo!zahandomuted\` - Déconnecter tout les utilisateurs muets en vocal`)
            .setFooter(`Sugges'Trosh réalisé par ezzud`)
            message.channel.send(embed)
    }
    if (message.content.startsWith(prefix)) {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let commande_file = client.commands.get(command);
        if (commande_file) {
            commande_file.run(client, message, args);
        } else {
            var embed4 = new Discord.MessageEmbed().setTitle(`:x: Erreur`).setColor('#C21717').addField(`Oops`, `Commande inconnue, tapez s!help pour voir les commande disponibles`).setFooter(`Sugges'Trosh réalisé par ezzud`)
            return message.channel.send(embed4);
        }
    }
};