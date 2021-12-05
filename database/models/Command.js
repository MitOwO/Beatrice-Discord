const { Schema,model } = require("mongoose")

let commandSchema = new Schema({
    _id: { type: String },
    usages: { type: Number, default: 0 },
    maintenance: { type: Boolean, default: false },
    reason: {type: String},
});

let Command = model("Commands", commandSchema);
module.exports = Command;