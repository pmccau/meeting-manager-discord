'use strict';

const Discord = require("discord.js")
const client = new Discord.Client()
const auth = require('./auth.json');

function main() {
    // Enable the bot
    client.on("ready", () => {
        console.log(`Logged in as ${client.user.tag}!`)
    });

    // React to message events
    client.on("message", msg => {
        // Test bot status
        if (msg.content === '!ping') {
            msg.reply("!pong");

        } else if (msg.content.length > 7) {

            // create a video channel using: !vcreate <channel name>
            // create a text channel using: !tcreate <channel name>
            // create a category channel using: !ccreate <channel name>
            if (msg.content.slice(2, 8) === '!create') {
                let ctype = ""
                switch (msg.content.charAt(1)) {
                    case 'v':
                        ctype = "voice"
                        break
                    case 'c':
                        ctype = "category"
                        break
                    default:
                        ctype = "text"
                }
                makeChannel(msg, ctype, msg.content.split(" ")[1])

            // Delete a channel using expression: !cdelete <channel name>
            } else if (msg.content.slice(1, 8) === "!cdelete") {
                let targetChannel = msg.content.split(" ")[1]
                let channels = msg.guild.channels.cache
                channels.forEach((value, key, map) => {
                    if (value.name === targetChannel) {
                        console.log("Deleting channel name " + value.name + " [" + value.id + "]")
                        value.delete()
                            .then(console.log("Success"))
                    }
                })
            }

        // Move user to specific channel
        } else if (msg.content === "!members") {
            let members = msg.guild.members.fetch()
                .then(console.log)

        // Get help information using !help
        } else if (msg.content === "!help") {
            msg.reply(`You can ask me to:
            Create a new channel:
                !vcreate channel_name           Create a video channel
                !tcreate channel_name           Create a text channel
                !ccreate channel_name           Create a category channel
                
            Delete a channel:
                !cdelete channel_name           Deletes all channels matching the name provided
                
            Move a user to a specific channel:
                !umove user_name channel_name   Not yet available
            `)
        }
    });

    client.login(auth.token)
}

// Make a new channel from a user's message of type 'ctype' with name 'cname'
function makeChannel(message, ctype, cname){
    message.reply("Attempting to create test channel")
    message.guild.channels.create(cname, {
        "type": ctype
    })
}

if (require.main === module) {
    main()
}