'use strict'
const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
	let emoji = client.emojis.cache.get('732581319678361662')
		var embed = new Discord.MessageEmbed()
		.setTitle(`${emoji} Aide`)
			.setThumbnail(client.user.avatarURL)
			.setDescription('Renseignez-vous sur les commandes du bot')
			.setColor('#6DC61E')
			.addField(`:loud_sound: Commande en vocal`, `\`jojo!zawarudo\` - Mute tout les membres d'un vocal pendant 10 secondes\n\`jojo!zahando\` - Déconnecter tout les utilisateurs d'un vocal\n\`jojo!zahandomuted\` - Déconnecter tout les utilisateurs muets en vocal\n\`jojo!cream\` - Supprimer le salon vocal\n\`jojo!crazydiamond\` - Déplacer tout les utilisateurs en vocal dans le salon\n\`jojo!killerqueen\` - Déplacer les utilisateurs dans un salon nommé "BTD" pour les renvoyer dans l'autre salon après quelques secondes`)
			.addField(`:x: Commande de secours`, `\`jojo!fix\` - Fixer le problème d'action en cours`)
			.setFooter(`Réalisé par ezzud#0001`)
			message.channel.send(embed)


}
module.exports.help = {
    name: "help"
}