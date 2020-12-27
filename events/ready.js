'use strict';
const fs = require('fs');
const Discord = require("discord.js");
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
};
const editJsonFile = require('edit-json-file')
const config = editJsonFile('./config.json')

module.exports = async (client) => {
    config.set('choice', 'off')
    config.set('roulette', 'off')
    config.set('delay', false)
    config.save()
    console.log(` Connexion à l'API effectuée `);
    console.log(` TAG: ${client.user.tag} ID: ${client.user.id}`);
    setInterval(() => {
        const liste = [`jojo!help`, `mentionne moi bg`, `jojo!help`]
        const index = Math.floor(Math.random() * (liste.length - 1) + 1);
        client.user.setPresence({
            activity: {
                name: `${liste[index]}`
            },
            status: 'dnd'
        })
    }, 5000);
}