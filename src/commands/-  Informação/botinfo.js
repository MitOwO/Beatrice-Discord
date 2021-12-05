const Chariot = require('chariot.js');
const pkg = require(`${process.cwd()}/config.json`)
class Botinfo extends Chariot.Command {
    constructor() {
        super(); 

        this.name = 'botinfo';
        this.aliases = ['kaedeinfo'];
        //this.subcommands = [''];
        //this.permissions = [''];
        //this.userPermissions = [''];
        this.nsfw = false;
        this.owner = false;
        this.allowDMs = false;
        this.cooldown = 3;
        this.help = {
            message: 'Pega as informações do bot',
            usage: 'botinfo',
            example: ['botinfo'],
            inline: true,
            visible: true
        }
    }

    /**
     * Precondition testing method. This method will run BEFORE the main command logic.
     * Once every test passed, next() MUST be called, in order to run the main command logic!
     * @param {object} message An Eris.Message object emitted from Eris
     * @param {string[]} args An array containing all provided arguments
     * @param {object} chariot The main bot client.
     * @param {Function} next Marking testing as done, invoking the main command executor
     */
    async runPreconditions(message, args, chariot, next) {
        next();
    }
    /*
    Nota: o comando foi extraido da TomokoBot e convertido.
    veja: https://github.com/em1lyy/TomokoBot/blob/5cd5f5f9d7d46c7eef3a51eae5e78f580fd07f12/TomokoBot/commands/status.js
    Todos os direitos reservados.

    */
    /**
     * Main method running after passing preconditions
     * @param {object} message An Eris.Message object emitted from Eris
     * @param {string[]} args An array containing all provided arguments
     * @param {object} chariot The main bot client. 
     */
    async execute(message, args, chariot) {
        let totalSeconds = (this.client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

var guildInShard = 0;
this.client.guilds.forEach((guild) => { 
    if(guild.shard.id === message.member.guild.shard.id) {
        guildInShard++;
    }
});        


function getUserName(member) {
    if (member.nick === null) {
        return member.username;
    } else {
        return member.nick;
    }
}
    
        this.client.createMessage(message.channel.id, {
            "embed": {
                "title": "Painel de Informações | "+this.client.user.username,
                "description": "Aqui está algumas informações sobre mim, sobre meu status atual e mais.",
                "color": "13115457",
                "footer": {
                    "icon_url": message.author.avatarURL,
                    "text": "Pedido por: " + getUserName(message.member)
                },
                "thumbnail": {
                    "url": this.client.user.avatarURL
                },
                "author": {
                    "name": this.client.user.username,
                    "icon_url": this.client.user.avatarURL
                },
                "fields": [
                    {
                        "name": ":clock3: | Tempo online",
                        "value": (`${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos...`)
                    },
                    {
                        "name": ":desktop: Versão Atual",
                        "value": "Rodando atualmente: **Versão " + pkg.version + "**."
                    },
                    {
                        "name": ":earth_africa: Análises Globais",
                        "value": "Servidores: **" + this.client.guilds.size + "**\nShards: **" + this.client.shards.size + "**\nUsuários: **" + this.client.users.size + "**",
                        "inline": true
                    },
                    {
                        "name": ":diamond_shape_with_a_dot_inside: Análises do Shard",
                        "value": "Servidores: **" + guildInShard + "**\nID do Shard: **" + message.member.guild.shard.id + "**\nUsuários: **" + message.member.guild.memberCount + "**",
                        "inline": true
                    },
                    {
                        "name": ":floppy_disk: | Uso de RAM",
                        "value": "**" + (Math.round(process.memoryUsage().rss / 1024 /1024)) + "** MB",
                        "inline": true
                    },
                    {
                        "name": ":floppy_disk: | Uso de Heap",
                        "value": "**" + (Math.round(process.memoryUsage().heapUsed / 1024 / 1024)) + "** MB / **" + (Math.round(process.memoryUsage().heapTotal / 1024 / 1024)) + "** MB",
                        "inline": true
                    },
                    {
                        "name": ":headphones: | Nodos do Lavalink",
                        "value": ("``lavalink desabilitado``")
                    },
                    {
                        "name": "E.. Só!",
                        "value": "Em breve mais coisas - certifique de estar atualizado usando ->changelog."
                    },
                    
                ]
            }
        });
    }
}


module.exports = new Botinfo();
