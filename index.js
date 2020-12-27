const Discord = require('discord.js');
const sugg = new Set();
const rrdelay = new Set();
const roulette = new Set();
const roulettepp = new Set()
const editJsonFile = require('edit-json-file')
const config = editJsonFile('./config.json')
const prefix = "s!";
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const fs = require('fs')
const moment = require('moment');
const storage = require('quick.db');
const img = new storage.table('imgInfos');
const db = new storage.table('userInfos');
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
});

client.db = db
client.img = img
var util = require('util');
launch().then(console.log(`\x1b[0m[Statut]` + ` \x1b[32m ON` + `\x1b[0m`));
async function launch() {
    await _eventHandler();
    await _commandHandler();
}
/*/

    Configuration et fonctions

/*/
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

function _commandHandler() {
    fs.readdir("./commands/", (err, files) => {
        if (err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
            console.log("Aucun fichier trouvé dans ./commands/");
            return;
        }
        jsfile.forEach((f, i) => {
            let props = require(`./commands/${f}`);
            console.log(`\x1b[36m[COMMANDES]` + ` \x1b[0mFichier ${f}` + `\x1b[0m`);
            client.commands.set(props.help.name, props);
        });
        console.log(`\x1b[32m` + ` \x1b[32mChargement des commandes effectué` + `\x1b[0m`);
    });
}

function _eventHandler() {
    fs.readdir('./events/', async (err, f) => {
        if (err) console.log(err);
        let jsfile = f.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
            console.log("Aucun fichier trouvé dans ./events/");
            return;
        }
        f.forEach((f) => {
            const events = require(`./events/${f}`);
            console.log(`\x1b[32m[EVENTS]` + ` \x1b[0mFichier ${f}` + `\x1b[0m`);
            const event = f.split(".")[0];
            client.on(event, events.bind(null, client));
        });
        console.log(`\x1b[32m` + ` \x1b[32mChargement des events effectué` + `\x1b[0m`);
    });
}

client.login(config.get('token'));
console.log(`Connexion à l'API discord.js en cours...`);
/*/

client.on('message', async message => {
	if(message.channel.type === 'dm') return;
	if(message.author.bot) return;
	if(!message.content.startsWith("-")) return;

})

client.on('message', async message => {
	if(message.author.bot) return;
	if(message.channel.type === 'dm') return;

	
	if(message.content.startsWith(prefix)) {
		let arg = message.toString()
		arg = arg.replace(/^s!+/i, '');
		arg = arg.split(' ');
		if(arg[0] === 'sw') {
			if(arg[1] === 'start') {
				if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
				if(await config.get('gw') === true) return(message.channel.send(`:x: **Un Giveaway est déjà en cours**`));
				await config.set('gw', true).save()
				let chn = await message.guild.channels.create('secure-gw', { type: 'text'});
				await chn.setParent('707978919243939872', { lockPermissions: false });
				await chn.overwritePermissions([
  				{
     				id: message.guild.roles.everyone,
    				deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
    			}
    			]);
				await config.set('gw-channel', chn.id).save()
				await message.channel.send(`Un Drop sécurisé à commencé! faites s!sg join pour le rejoindre`);
			}
			if(arg[1] === 'stop') {
				if(!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return;
				if(await config.get('gw') === false) return(message.channel.send(`:x: **Aucun drop trouvé**`));
				let value = await config.get('gw-channel')
				let chn = message.guild.channels.cache.find(x => x.id === value);
				if(!chn) return;
				await chn.delete();
				await config.set('gw-channel', undefined).save()
				await config.set('gw', false).save()
				message.react('✅');
			}
			if(arg[1] === 'join') {
				if(await config.get('gw') === false) return(message.channel.send(`:x: **Aucun drop lancé**`));
				let value = await config.get('gw-channel')
				let chn = message.guild.channels.cache.find(x => x.id === value);
				if(!chn) return;
				await chn.overwritePermissions([
  				{
     				id: message.author.id,
    				allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
    			}
    			]);
				await chn.overwritePermissions([
  				{
     				id: message.guild.roles.everyone,
    				deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
    			}
    			]);
    			message.react('✅')

			}
		}
		if(arg[0] === 'help') {

		} else if(arg[0] === 'delayed') {
			if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;
			let sizenumber = sugg.size
			sizenumber = sizenumber.toString();
			var embed5 = new Discord.MessageEmbed()
			.setTitle(`Liste`)
			.setColor('#13DEE4')
			.addField(`Effectif`, `${sizenumber}`)
			.setFooter(`Sugges'Trosh réalisé par ezzud`)	
			return message.channel.send(embed5);
		} else if(arg[0] === 'zawarudo') {
			if(!arg[1]) {
			if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;
			if(message.author.id !== '638773138712428575') return;
			if(message.channel.id !== '645285374364745728') return;
			var everyone = message.guild.roles.cache.get('643188015660924928')
			message.channel.overwritePermissions(everyone, {
                            SEND_MESSAGES: false
            });
            var embed = new Discord.MessageEmbed()
            .setAuthor(`ZA WARUDO`, message.author.avatarURL)
            .setDescription(`*Le temps sur le salon a été stoppé*`)
            .setImage(`https://cdn.discordapp.com/attachments/682274736306126925/744339121237000222/thelwrod_HD_720p.gif`)
            .setColor('#1ADDF8')
            .setTimestamp()
            await message.channel.send(embed)
            config.set('zawarudo', true)
            config.save()
            await sleep(10000);
			message.channel.overwritePermissions(everyone, {
                            SEND_MESSAGES: true
            });
            config.set('zawarudo', false)
            config.save()
           } else if(arg[1] === 'perma') {
           	if(config.get('zawarudo') === true) {
           		let everyone = message.guild.roles.cache.get('643188015660924928')
            var embed = new Discord.MessageEmbed()
            .setAuthor(`ZA WARUDO`, message.author.avatarURL)
            .setDescription(`*Le temps sur le salon a repris son cours*`)
            .setImage(`https://cdn.discordapp.com/attachments/682274736306126925/738865024751108146/zawarudo.gif`)
            .setColor('#1ADDF8')
            .setTimestamp()
            await message.channel.send(embed)
            config.set('zawarudo', false)
            config.save()
			message.channel.overwritePermissions(everyone, {
                            SEND_MESSAGES: true
            });
           	} else if(config.get('zawarudo') === false) {
           		let everyone = message.guild.roles.cache.get('643188015660924928')
            var embed = new Discord.MessageEmbed()
            .setAuthor(`ZA WARUDO`, message.author.avatarURL)
            .setDescription(`*Le temps sur le salon a été stoppé*`)
            .setImage(`https://cdn.discordapp.com/attachments/682274736306126925/738865024751108146/zawarudo.gif`)
            .setColor('#1ADDF8')
            .setTimestamp()
            await message.channel.send(embed)
            config.set('zawarudo', true)
            config.save()
			message.channel.overwritePermissions(everyone, {
                            SEND_MESSAGES: false
            });
           	}
           }

		} else if(arg[0] === 'deny') {
			return;
			if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;
			if(!arg[1]) return(message.channel.send(`:x: Veuillez renseigner un identifiant`));
			let msg = await message.guild.channels.get('682274736306126925').messages.fetch(arg[1])
			if(!msg) return(message.channel.send(`:x: Message introuvable`));
			message.channel.send(`Coucou`)	
		} else if(arg[0] === 'lastword') {
			if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;
			var embed = new Discord.MessageEmbed()
			.setDescription(`T'a pas lu le règlement?`)
			.setImage('https://cdn.discordapp.com/attachments/643440684224872466/732241956171677716/6eme_regle.png')
			message.channel.send(embed)
		} else if(arg[0] === 'userinfo') {
			let member;
			if(!message.mentions.users.first()) {
				if(arg[1] !== undefined) {
					member = arg[1]
				} else {
					member = message.author
				}
			} else {
				member = message.mentions.users.first()
			}
			member = message.guild.member(member)
			if(!member) return(message.channel.send(`:x: Veuillez renseigner un utilisateur`));
			let nick = message.guild.member(member).nickname
			if(nick === null) {
				nick = 'Aucun'
			}
			moment.locale('fr')
			var jdates = moment(member.joinedTimestamp).fromNow()
			var jdate = moment(member.joinedTimestamp).format('LLL')
			var cdates = moment(member.user.createdTimestamp).fromNow()
			var cdate = moment(member.user.createdTimestamp).format('LLL')
			let boosting = member.premiumSinceTimestamp;
			let boostings;
			if(!boosting) {
				boosting = "Ne booste pas le serveur"
				boostings = " ";
			} else {
				boosting = `depuis le ` + moment(boosting).format('LLL')
				boostings = `(${moment(member.premiumSince).fromNow()})`
				boostings = boostings.replace('il y a', 'depuis')
			}
			let msg = member.lastMessage
			if(!msg) {
				msg = 'Aucun'
			} else {
				msg = msg.content
			}
			let bott;
			if(member.user.bot === true) {
				bott = "Oui"
			} else if(member.user.bot === false) {
				bott = 'Non'
			} else {
				bott = 'Je ne sais pas'
			}
			var boost = client.emojis.find(n => n.name === '3670_NitroBoost')
			var botted = client.emojis.find(n => n.name === '9311_BOT') 
			var embed = new Discord.MessageEmbed()
			.setTitle('Info utilisateur')
			.setColor(`${member.displayHexColor}`)
			.setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
			.addField(`:bust_in_silhouette: Nom d'utilisateur`, `\` ${member.user.tag} \``, true)
			.addField(`:id: Identifiant`, `\` ${member.id} \``, true)
			.addField(`:eyeglasses: Surnom sur le serveur`, `\` ${nick} \``)
			.addField(`:door: A rejoint le serveur le`, `\` ${jdate} (${jdates})\``)
			.addField(`:wave: A rejoint Discord le`, `\` ${cdate} (${cdates})\``)
			.addField(`Booste le serveur?`, `\` ${boosting} ${boostings} \``)
			.addField(`:speech_left: Dernier message`, `\` ${msg} \``)
			.addField(`${botted} Est un bot?`, `\` ${bott} \``)
			message.channel.send(embed)
		} else if(arg[0] === 'bestmodo') {
			if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;
			message.delete()
		    const ListEmbed = new Discord.MessageEmbed()
            .setTitle('Meilleur Modérateur')
            .setColor('#1F25EF')
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`Les dés sont jetés...`);
        	message.channel.send(ListEmbed).then(async msg => {
        	let bestmodo = message.guild.roles.cache.get('645276643132178442').members.map(m=>m.user)
    		const rng = Math.floor(Math.random() * (bestmodo.length - 1) + 1);
    		let modopp = message.guild.roles.cache.get('645276643132178442').members.map(m=>m.user.avatarURL)
    		console.log(modopp)
    		const rngpp1 = Math.floor(Math.random() * (modopp.length - 1) + 1);
    		const rngpp2 = Math.floor(Math.random() * (modopp.length - 1) + 1);
    		const rngpp3 = Math.floor(Math.random() * (modopp.length - 1) + 1);
    		const rngpp4 = Math.floor(Math.random() * (modopp.length - 1) + 1);
    		let pp1 = modopp[rngpp1]
    		let pp2 = modopp[rngpp2]
    		let pp3 = modopp[rngpp3]
    		let pp4 = modopp[rngpp4]
    		console.log(pp1, pp2, pp3, pp4)
    		await sleep(2000);
        	var ListEmbed2 = new Discord.MessageEmbed()
            .setTitle('Meilleur Modérateur')
            .setColor('#1F25EF')
            .setThumbnail(pp1)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`Les dés sont jetés...`);
            await msg.edit(ListEmbed2)
    		await sleep(2000);
        	var ListEmbed3 = new Discord.MessageEmbed()
            .setTitle('Meilleur Modérateur')
            .setColor('#1F25EF')
            .setThumbnail(pp2)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`Les dés sont jetés...`);
            await msg.edit(ListEmbed3)
    		await sleep(2000);
        	var ListEmbed4 = new Discord.MessageEmbed()
            .setTitle('Meilleur Modérateur')
            .setColor('#1F25EF')
            .setThumbnail(pp3)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`Les dés sont jetés...`);
            await msg.edit(ListEmbed4)
    		await sleep(2000);
        	var ListEmbed5 = new Discord.MessageEmbed()
            .setTitle('Meilleur Modérateur')
            .setColor('#1F25EF')
            .setThumbnail(pp4)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`Attention...`);
            await msg.edit(ListEmbed5)
    		await sleep(3000);
        	var ListEmbedf = new Discord.MessageEmbed()
            .setTitle('Meilleur Modérateur')
            .setColor('#1F25EF')
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`La médaille du meilleur modérateur est decernée à ${bestmodo[rng]} :military_medal:`);
            await msg.edit(ListEmbedf)
            await sleep(10000)
            msg.delete()
        })    
		} else if(arg[0] === 'jarod') {
			console.log('Jaroded')

		} else if(arg[0] === 'say') {

		} else if(arg[0] === 'saytts') {
			if(message.author.id !== '638773138712428575') return(message.channel.send(`**Vu que vous abusez de la commande jvous la retire** ||Cheh||`));
		if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return;
    	if(!arg[1]) return(message.channel.send(`:x: Syntaxe: s!say #salon <message> | *Si aucun salon n'est renseigné, alors le message s'enverra dans le salon actuel*`));
    	let salon;
    	if(!message.mentions.channels.first()) {
    		salon = message.channel
    		if(!arg[1]) return(message.channel.send(`:x: Veuillez renseigner un message`));
    	} else {
    		salon = message.mentions.channels.first()
    		if(salon.id !== '643440684224872466' && salon.id !== '643440738935504927') return(message.channel.send(`Uniquement la discussion staff ou les commandes staff`));
    		if(!arg[2]) return(message.channel.send(`:x: Veuillez renseigner un message`));
    	}
    	if(!salon) return(message.channel.send(`:x: Salon introuvable`));
    	if(salon.guild.id !== message.guild.id) return(message.channel.send(`:x: Salon introuvable`));
    	let mess = message.content
    	mess = mess.replace('s!saytts', '')
    	mess = mess.replace(`<#${salon.id}>`, '')
    	mess = mess.replace(`@everyone`, ``)
    	mess = mess.replace(`@Membre`, ``)
    	mess = mess.replace(`<@&`, '/!\ ')
    	message.delete()
    	salon.send(mess, { tts: true}).then(async msg => {
    	var logs = new Discord.MessageEmbed()
    	.addField(`Nouveau say!`, `Utilisateur: ${message.author}\nMessage: \`${mess}\`\nSalon: ${salon}\nType: TTS`)
    	.setTimestamp()
    	.setThumbnail(client.user.avatarURL)
    	.setColor('#F1B429')
    	message.guild.channels.get('643440869566840842').send(logs)
})
    	} else if(arg[0] === 'reload') {
        if(message.author.id === '638773138712428575') {
            let emoji = client.emojis.cache.get(`688433071573565440`)
            let emoji2 = client.emojis.cache.get('688392489320579102')
            await message.channel.send(`${emoji} **Redémarrage du bot en cours...**`)
            let dater = new Date().getTime();
            	await console.log(`\x1b[36m%s\x1b[0m`, '[TROSH]', '\x1b[0m',` Redémarrage du bot en cours...`);
                client.destroy().then(() => {
                    client.login('NzA3MzM4MzI1NTEzNzMyMjY3.XrHXfg.oDNjCGOT9LDubyiviyMF8iKxZpQ').then(() => {
                        let datef = new Date().getTime();
                        let time = datef - dater;
                        time = time / 1000
                        message.channel.send(`${emoji2} **Redémarrage effectué** (*${time}s*)`)
                    })

                })
            
        }
    	} else if(arg[0] === 'vip') {


    	}  else if(arg[0] === 'popularity') {


    	} else if(arg[0] === 'superlike') {

    } else if(arg[0] === 'supercount') {

    	} else if(arg[0] === 'bestmember') {
   		if(!arg[1]) {
   			message.channel.send(`:x: Syntaxe: s!bestmember <start|join|last>`)
   			return;
   		}
   		if(arg[1] === 'start') {
   		if(config.get('delay') === true) return(message.channel.send(`Veuillez patienter **1 minute** entre chaque utilisation de la commande`));
   			if(config.get('roulette') === 'on') {
   				message.channel.send(`:x: Une roulette a déjà été organisée`)
   				return;
   			}
   			await config.set('roulette', 'on')
   			await config.set('choice', 'on')
   			await config.save()
   			await roulette.clear()
   			await roulettepp.clear()
   			await message.channel.send(`:clock1: Une roulette pour élire le meilleur membre a commencée, faites \`s!bestmember join\` pour la rejoindre. Vous avez **30 secondes** pour rejoindre la liste`)
   			await roulette.add(message.author.id)
   			await roulettepp.add(message.author.avatarURL)
   			console.log(roulette.keys())
   			await sleep(15000)
   			await message.channel.send(`:clock10: 15 secondes restantes avant l'élection`)
   			await sleep(15000)
   			if(roulette.size < 3) {
   				await config.set('choice', 'off')
   				await config.set('roulette', 'off')
   				await config.save()
   				return(message.channel.send(`:x: Il faut au moins 3 participants pour lancer une roulette`));
   			}
   			await message.channel.send(`**STOP**, Le meilleur membre va donc être élu parmis \`${roulette.size}\` participants`)
   			config.set('choice', 'off')
   			config.save()
		    const ListEmbed = new Discord.MessageEmbed()
            .setTitle('Meilleur Membre')
            .setColor('#1BEE10')
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`Les dés sont jetés...`);
        	message.channel.send(ListEmbed).then(async msg => {
        	let bestmodo = Array.from(roulette);
    		const rng = Math.floor(Math.random()*bestmodo.length);
    		let modopp = Array.from(roulettepp)
    		const rngpp1 = Math.floor(Math.random()*modopp.length);
    		const rngpp2 = Math.floor(Math.random()*modopp.length);
    		const rngpp3 = Math.floor(Math.random()*modopp.length);
    		const rngpp4 = Math.floor(Math.random()*modopp.length);
    		let pp1 = modopp[rngpp1]
    		let pp2 = modopp[rngpp2]
    		let pp3 = modopp[rngpp3]
    		let pp4 = modopp[rngpp4]
    		let winner = bestmodo[rng]
    		await sleep(2000);
    		let emoji = client.emojis.cache.get(`688433071573565440`)
        	var ListEmbed2 = new Discord.MessageEmbed()
            .setTitle('Meilleur Membre')
            .setColor('#1BEE10')
            .setThumbnail(pp1)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`${emoji} Regroupement des participants`);
            await msg.edit(ListEmbed2)
    		await sleep(2000);
        	var ListEmbed3 = new Discord.MessageEmbed()
            .setTitle('Meilleur Membre')
            .setColor('#1BEE10')
            .setThumbnail(pp2)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`${emoji} Choix du pseudo le plus swag`);
            await msg.edit(ListEmbed3)
    		await sleep(2000);
        	var ListEmbed4 = new Discord.MessageEmbed()
            .setTitle('Meilleur Membre')
            .setColor('#1BEE10')
            .setThumbnail(pp3)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`${emoji} Recherche des meilleures photos de profil`);
            await msg.edit(ListEmbed4)
    		await sleep(2000);
        	var ListEmbed5 = new Discord.MessageEmbed()
            .setTitle('Meilleur Membre')
            .setColor('#1BEE10')
            .setThumbnail(pp4)
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`${emoji} Choix du meilleur membre`);
            await msg.edit(ListEmbed5)
    		await sleep(3000);
        	var ListEmbedf = new Discord.MessageEmbed()
            .setTitle('Meilleur Membre')
            .setColor('#1BEE10')
            .setFooter('Certifié no fake | créé par ezzud')
            .setDescription(`<@${winner}> vient d'être élu en tant que meilleur membre :military_medal:`);
            await msg.edit(ListEmbedf)
            await config.set('delay', true)
            await config.set('roulette', 'off')
            await config.set('lastthird', config.get('lastsecond'))
            await config.set('lastsecond', config.get('lastwinner'))
            await config.set('lastwinner', winner)
            config.save()
            roulette.clear()
            roulettepp.clear()
            await sleep(15000)
            msg.delete()
            await sleep(45000)
            await config.set('delay', false)
            await config.save()
        }) 
   		} else if(arg[1] === 'join') {
   			if(config.get('roulette') === 'off') {
   				message.channel.send(`:x: Aucune partie n'a commencée`)
   				return;
   			}
   			if(config.get('choice') === 'off') {
   				message.channel.send(`:x: Vous ne pouvez plus rentrer`)
   				return;
   			}
   			if(roulette.has(message.author.id)) {
   				message.channel.send(`:x: Vous êtes déjà présent dans la liste`)
   				return;
   			}
   			await roulette.add(message.author.id)
   			await roulettepp.add(message.author.avatarURL)
   			message.channel.send(`${message.author} a bien été ajouté dans la liste`)
   		} else if(arg[1] === 'last') {
   			let wnr = config.get('lastwinner')
   			let wnr2 = config.get('lastsecond')
   			let wnr3 = config.get('lastthird')
   			if(wnr === 'Aucun :(') {
   				wnr = 'Aucun :('
   			} else {
   				wnr = `<@${wnr}>`
   			}
   			if(wnr2 === 'Aucun :(') {
   				wnr2 = 'Aucun :('
   			} else {
   				wnr2 = `<@${wnr2}>`
   			}
   			if(wnr3 === 'Aucun :(') {
   				wnr3 = 'Aucun :('
   			} else {
   				wnr3 = `<@${wnr3}>`
   			}
   			var embed = new Discord.MessageEmbed()
   			.setThumbnail(client.user.avatarURL)
   			.addField(`Dernier(s) meilleur(s) membre(s)`, `:arrow_forward:  ${wnr}\n:arrow_forward:  ${wnr2}\n:arrow_forward:  ${wnr3}`)
   			.setColor('#10EEE1')
   			message.channel.send(embed)
   		} else {
		    message.channel.send(`:x: Syntaxe: s!bestmember <start|join|last>`)
   			return;			
   		}

		} else {
	
		}
	
	}
})/*/
client.on('invalidated', async => {
    client.destroy().then(() => {
        client.login(config.get("token"))
    })
})