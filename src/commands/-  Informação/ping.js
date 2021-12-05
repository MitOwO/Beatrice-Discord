const Chariot = require('chariot.js');

class Ping extends Chariot.Command {
    constructor() {
        super(); 

        this.name = 'ping';
        // this.aliases = [''];
        //this.subcommands = ['welcomemsg', 'autorole'];
        // this.permissions = [''];
        //this.userPermissions = ['administrator'];
        this.nsfw = false;
        this.owner = false;
        this.allowDMs = false;
        this.cooldown = 3;
        this.help = {
            message: 'Verifica o ping do bot.',
            usage: '->ping.',
            example: ['->ping'],
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
      
        next();
    }

    /**
     * Main method running after passing preconditions
     * @param {object} message An Eris.Message object emitted from Eris
     * @param {string[]} args An array containing all provided arguments
     * @param {object} chariot The main bot client. 
     */
    async execute(message, args, chariot) {
        message.channel.createMessage(`:satellite: | Latência: ${Math.abs(Date.now() - message.timestamp)}ms`)
    }
}

module.exports = new Ping();
