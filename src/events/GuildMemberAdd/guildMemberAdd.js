const {Event, Logger} = require('chariot.js');

class GuildMemberAdd extends Event {
    constructor() {
        super('guildMemberAdd');
    }

    /**
     * Main event handling method running upon the registered event being fired.
     * Arguments passed to the execute method are always relative to the event it is processing.
     * For instance the "ready" event has no args, whereas the "message" event gets passed "message"
     * 
     * @param {*} args Arguments for the main event executor as described above.
     */
    async execute(guild, member) {
            
            const server = await this.client.database.guilds.findOne({_id: guild.id})
			
			if(server.welcome.has) {
                this.client.createMessage(server.welcome.channel, 
                server.welcome.welcome_msg
                    .replace(/{member}/g, `<@${member.id}>`)
                    // .replace(/{name}/g, `${member.user.username}`)
                    // .replace(/{total}/g, guild.memberCount)
                    .replace(/{guildName}/g, guild.name)
                )
            }
			if(server.autorole.has) {
				
				if(!member.bot) {
				await member.addRole(server.autorole.role_id, "Sistema de autorole")
				}
				if(server.autorole.bot_role_id) {
					if(member.bot) {
						await member.addRole(server.autorole.bot_role_id, "Sistema de autorole")
					}
				}
			}
			
				
			
    }
}

module.exports = new GuildMemberAdd();
