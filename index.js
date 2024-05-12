const { GatewayIntentBits, Integration, ChannelFlags, AttachmentBuilder } = require('discord.js');
const Discord = require('discord.js');
const {
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  MessageAttachment,
  ButtonStyle,
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,ApplicationCommandOptionType
} = require('discord.js');
const { PermissionsBitField } = require('discord.js');
const config = require('./config.json');
const rolesallowed = config.allowed_roles
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages
  ],
});
require('dotenv').config();
const express = require("express")
const app = express();

app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en',commandOptionName:'player2' });

client.on('ready', () => {
    client.application.commands.create(
        {
            name: config.cmdxo,
            description:config.xodescription,
            options:[
              {
                name:'player2',
                description:config.xomention_xodescription,
                type:ApplicationCommandOptionType.User,
                required:false
              }
            ]
        },
        config.idserver
    );

    client.on('interactionCreate', interaction => {
        if (interaction instanceof Discord.CommandInteraction && interaction.commandName === config.cmdxo) {
            game.handleInteraction(interaction);
        }
    });
});

client.login(process.env.TOKEN)