
const {Command} = require("chariot.js")

class Run extends Command {
    constructor() {
        super();
        this.name = 'run';
        this.permissions = ['embedLinks'];
        this.allowDMs = true;
        this.owner = true;
        this.help = {
            message: 'Executa código JavaScript direto no Node. < Restrito ao Owner. >',
            usage: 'run [código]',
            example: ['<prefix>run this.client'],
            inline: true
            
        }
    }

    async execute(message, args, chariot) {
    
        try {
            
            if (!args[0]) return;

            let argseval = args.join(" ");
            let result = await eval(argseval);
            if (typeof result !== "string")
            result = require("util").inspect(result, { depth: 0 })
            message.channel.createMessage(`**Resultado:** \`\`\`js\n${result}\`\`\``);

        } catch(err) {message.channel.createMessage("``" +err+"``")}
    }
}
    module.exports = new Run();