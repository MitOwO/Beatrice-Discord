const {connect} = require("mongoose")
const {Logger} = require("chariot.js")
const config = require("../config.json")
module.exports = {
    start() {
        try {
            connect(config.mongo_url)
            Logger.success("DATABASE", "Conectada com sucesso.")
        } catch (err) {
            if (err) return Logger.error("DATABASE", "Algum erro ocorreu. | " + err)
        }
    },
};