const { Schema,model } = require("mongoose")

let clientSchema = new Schema({
    _id: { type: String },
    maintenance: { type: Boolean, default: false },
    reason: {type: String},
})

let Client = model("Client", clientSchema);
module.exports = Client;