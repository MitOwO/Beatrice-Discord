const {RichEmbed} = require("chariot.js");

module.exports = class ClientEmbed extends (RichEmbed) {
    constructor (user, data = {}) {
        super(data);
        this.setTimestamp();
        this.setColor("LUMINOUS_VIVID_PINK");
        this.setFooter(`Pedido por ${user.tag}`, user.displayAvatarURL({dynamic: true}))
    }
}