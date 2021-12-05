const {Event, Logger} = require('chariot.js');
const User = require("../../../database/models/User"),
      Guild = require("../../../database/models/Guild")
const database = require("../../../database/index")
class Ready extends Event {
    constructor() {
        super('ready');
    }

    /**
     * Main event handling method running upon the registered event being fired.
     * Arguments passed to the execute method are always relative to the event it is processing.
     * For instance the "ready" event has no args, whereas the "message" event gets passed "message"
     * 
     * @param {*} args Arguments for the main event executor as described above.
     */
    async execute(client) {
        this.client.database.users = User;
        this.client.database.guilds = Guild; 
       
        Logger.success('SUCCESS', "Client is ready, and logged with username " + this.client.user.username)
        
        setInterval(() => {
            let status = [
                {name: "Beatrice | ->help", type: 0},
                {name: `${this.client.users.size} lindinhos.`, type: 3},
                {name: `${this.client.guilds.size} servidores`, type: 3},
                {name: `o Subaru chorando, eu diria.`, type: 3}
            ]
            
            let randomstts = Math.floor(Math.random() * status.length)
            this.client.editStatus('dnd', status[randomstts])
            // console.log(status[randomstts])
        }, 10 * 2000)
    }
}

module.exports = new Ready();
