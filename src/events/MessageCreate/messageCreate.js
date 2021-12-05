const {Event, Logger} = require('chariot.js');
const AntiInvite = require("./modules/AntiInvite")
class MessageCreate extends Event {
    constructor() {
        super('messageCreate');
    }

    /**
     * Main event handling method running upon the registered event being fired.
     * Arguments passed to the execute method are always relative to the event it is processing.
     * For instance the "ready" event has no args, whereas the "message" event gets passed "message"
     * 
     * @param {*} args Arguments for the main event executor as described above.
     */
    async execute(message) {
        const Anti = new AntiInvite(this.client)
        await Anti.run(message)
        
        try {const server = await this.client.database.guilds.findOne({ _id: message.guild.id });
        let user = await this.client.database.users.findOne({ _id: message.author.id})
        
        if(!server) await this.client.database.guilds.create({_id: message.guild.id})
        if (!user)  await this.client.database.users.create({ _id: message.author.id })
        }catch(err){console.log(err)}
    }
}

module.exports = new MessageCreate();
