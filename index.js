/* Beatrice-Discord - entry point file
    Copyright (C) 2021 - MitOwO

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
const mongodb       = require("./database/index")
const Chariot       = require("chariot.js");
const config        = require("./config.json")
// const Erela         = require("./structures/erela-client/index") - WIP

class Beatrice extends Chariot.Client {
    constructor() {
        super(
            new Chariot.Config
                (
                config.token,
                config.chariotSetup,
                config.extra,
                {intents: ["all"]}
                ),
            )
        this.database = new Chariot.Collection();
       
        //this.manager = Erela(this)
    }
    async initLoaders() {
        return Files.requireDirectory("./src/modules/loaders", (Loader) => {
          Loader.load(this).then(
            Logger.sucess(`LOADERS`, `Pasta Loaders carregado com sucesso.`)
          );
        });
      }
}
mongodb.start()
const client = new Beatrice()
module.exports = client;

