const Discord = require('discord.js');
const sugg = new Set();
const rrdelay = new Set();
const roulette = new Set();
const roulettepp = new Set()
const editJsonFile = require('edit-json-file')
const config = editJsonFile('./config.json')
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const fs = require('fs')
const moment = require('moment');
const storage = require('quick.db');
const db = new storage.table('userInfos');
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION']
});

client.db = db
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


client.on('invalidated', async => {
    client.destroy().then(() => {
        client.login(config.get("token"))
    })
})