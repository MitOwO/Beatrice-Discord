const {Schema, model} = require("mongoose")

let userSchema = new Schema(
    {
    _id: {type: String},
    Exp: 
        {
        xp: { type: Number, default: 1 },
        level: {type: Number, default: 1 },
        nextLevel: {type: Number, default: 100},
        id: {type: String, default: "null"},
        user: {type: String, default: "null"}
        },
    coins: {type: Number, default: 0},
    bank: {type: Number, default: 0},
    daily: {type: Number, default: 0},
    }
);

const User = model("Users", userSchema);
module.exports = User;