const Chariot = require('chariot.js');

class CommandName extends Chariot.Command {
    constructor() {
        super(); 

        this.name = 'config';
        this.aliases = ['setup'];
        this.subcommands = ['welcomemsg', 'autorole'];
        // this.permissions = [''];
        this.userPermissions = ['administrator'];
        this.nsfw = false;
        this.owner = false;
        this.allowDMs = false;
        this.cooldown = 3;
        this.help = {
            message: 'Configura algumas coisas do seu servidor.',
            usage: '->config <subcomando>.',
            example: ['->config prefix <prefix>'],
            inline: true,
            visible: true
        }
    }

    /**
     * Precondition testing method. This method will run BEFORE the main command logic.
     * Once every test passed, next() MUST be called, in order to run the main command logic!
     * @param {object} message An Eris.Message object emitted from Eris
     * @param {string[]} args An array containing all provided arguments
     * @param {object} chariot The main bot client.
     * @param {Function} next Marking testing as done, invoking the main command executor
     */
    async runPreconditions(message, args, chariot, next) {
        if(!args) return message.channel.createMessage(`Subcomando não encontrado!`)
        next();
    }

    /**
     * Main method running after passing preconditions
     * @param {object} message An Eris.Message object emitted from Eris
     * @param {string[]} args An array containing all provided arguments
     * @param {object} chariot The main bot client. 
     */
    async execute(message, args, chariot) {
        /* Main command logic goes here */
    }
    async welcomemsg(message, args, chariot) {
        const server = await this.client.database.guilds.findOne({_id: message.guild.id})

        const msg = args.slice(1, args.length ).join(" ")
        const channel = args[0]
        .slice(2, args[0].length -1)
        message.channel.createMessage(`Selecionado.`)

        await this.client.database.guilds.findOneAndUpdate(
            {_id: message.guild.id},
            { $set: {welcome: {has: true, welcome_msg: msg, channel: channel} } }
        )
    }

    async autorole(message, args, chariot) {
        if(!args[0].startsWith("<")) return message.channel.createMessage("Isso não parece um ID válido.")
        if(!args[1].startsWith("<")) return message.channel.createMessage("Isso não parece um ID válido.")
        
        const server = await this.client.database.guilds.findOne({_id: message.guild.id})
        let botroleID;
        const roleID = args[0]
        .slice(3, args[0].length -1)
        if(!args[1]) botroleID = null
        botroleID = args[1]
        .slice(3, args[0].length -1)
        message.channel.createMessage(`Selecionado.`)

        await this.client.database.guilds.findOneAndUpdate(
            {_id: message.guild.id},
            { $set: {autorole: {has: true, role_id: roleID, bot_role_id: botroleID} } }
        )
    }
}

module.exports = new CommandName();