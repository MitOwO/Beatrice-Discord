const { Schema, model } = require("mongoose")

let guildSchema = new Schema({

    _id: { type: String },
    prefix: { type: String, default: ">" },
    lang: { type: String, default: "pt-BR" },
    xpenabled: {type: Boolean, default: "true"},

    welcome : {
        has: {type: Boolean, default: false},
        welcome_msg: {type: String},
        channel: {type: String}
    },
    antinvite: {
        status: {type: String, default: null},
        channels: {type: Array, default: []},
        roles: {type: Array, default: []}
    },
    autorole: {
        has: {type: Boolean, default: false},
        role_id: {type: String, default: null},
        bot_role_id: {type: String, default: null},
    }

});

let Guild = model("Guilds", guildSchema);
module.exports = Guild;