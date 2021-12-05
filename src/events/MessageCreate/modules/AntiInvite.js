module.exports = class AntInvite {
    constructor(client) {
      this.client = client;
    }
  
    async run(message) {
     
        const doc = await this.client.database.guilds.findOne({
          _id: message.guild.id,
        });
      
        const regex =
          /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|(discord|discordapp)\.com\/invite)\/.+[a-z]/g;
  
        if (!regex.test(message.content)) return;
  
        const channels = doc.antinvite.channels.some(
          (x) => x === message.channel.id
        );
        const roles = doc.antinvite.roles.some((x) =>
          message.member.roles.has(x)
        );
  
        if (
          !message.member.permissions.has("administrator") &&
          !message.member.permissions.has("manageMessages") &&
          !channels &&
          !roles
        )
          
              return message.delete();
    }
}
