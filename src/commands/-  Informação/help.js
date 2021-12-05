const Embed = require('../../utilities/ChariotUtilities/ChariotEmbed');
//const Logger = require('../../helpers/Logger');
const {Command} = require("chariot.js")

class Help extends Command {
    constructor() {
        super();
        this.name = 'help';
        this.permissions = ['embedLinks'];
        this.allowDMs = true;
        this.help = {
            message: 'Veja a informação de um comando, se não for passado um comando, o painel geral aparecerá.',
            usage: 'help [comando]',
            example: ['<prefix>help', '<prefix>help <command>'],
            inline: true
            
        }
    }

    async execute(message, args, chariot) {
        const prefixHandler = (message.prefix === `<@!${chariot.user.id}> ` || message.prefix === `<@${chariot.user.id}> `) ? `@${chariot.user.username}#${chariot.user.discriminator} ` : message.prefix;

        if (!args[0]) {
            const commandNames = chariot.commands.filter((cmnds) => !cmnds.owner).filter((cmnds) => (cmnds.hasOwnProperty('help')) ? ((cmnds.help.visible === undefined) ? true : !(cmnds.help.visible === false)) : true).map((cmnds) => '`' + cmnds.name + '`');

            return message.channel.createEmbed(new Embed()
                .setColor(chariot.chariotOptions.chariotConfig.primaryColor || 'RANDOM')
                .setAuthor("Painel de Ajuda | Beatrice", this.client.user.avatarURL)
                .setDescription(`Aqui estão meus comandos!\n Você pode ver a ajuda específica de um comando digitando \`${prefixHandler}help <nome_do_comando>\`!`)
                .addField('Comandos', commandNames.join(', '))
                .setImage("https://images-ext-1.discordapp.net/external/QbwO1CjwsOMnfGiVJnnd6g7huTBj-S4IF_VsAd4jCSU/https/i.imgur.com/xN97vsg.jpg?width=1020&height=74")
                .setTimestamp()
                .setColor(process.env.EMBED)
                .setFooter(`Pedido por ${message.author.tag}`, message.author.avatarURL)
            );
        } else {
            const foundCommand = chariot.commands.get(args[0]) || chariot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(args[0]));

            if (!foundCommand) {
                return message.channel.createEmbed(new Embed()
                    .setColor('RED')
                    .setTitle(`O comando **${args[0]}** não foi encontrado!`)
                );
            }

            if (foundCommand.owner && !chariot.chariotOptions.chariotConfig.owner.includes(message.author.id)) {
                return message.channel.createEmbed(new Embed()
                    .setColor('RED')
                    .setTitle('Permissões insuficientes!')
                );
            }

            if (foundCommand && !foundCommand.help) {
                return message.channel.createEmbed(new Embed()
                    .setColor('RED')
                    .setDescription(`Infelizmente o **${foundCommand.name}** não tem ajuda ainda.`)
                );
            }

            const helpEmbed = new Embed();

            helpEmbed.setColor(chariot.chariotOptions.chariotConfig.primaryColor || 'RANDOM');
            helpEmbed.setTitle(`**${foundCommand.name}** - Ajuda`);
            helpEmbed.setDescription(foundCommand.help.message || 'Sem descrição de ajuda');
            helpEmbed.addField('Usos', (foundCommand.help.usage) ? `\`${prefixHandler}${foundCommand.help.usage}\`` : 'Sem usos disponíveis', foundCommand.help.inline);

            let helpArray = [];
            let exampleText = '';

            if (Array.isArray(foundCommand.help.example)) {
                helpArray = foundCommand.help.example.map((helpItem) => `\`${prefixHandler}${helpItem}\``);
                exampleText = helpArray.join(', ');
            } else {
                exampleText = `\`${prefixHandler}${foundCommand.help.example}\``;
            }

            helpEmbed.addField(Array.isArray(foundCommand.help.example) ? 'Exemplos' : 'Exemplo', exampleText, foundCommand.help.inline);

            if (foundCommand.aliases && foundCommand.aliases.length) {
                const commandAliases = foundCommand.aliases.map((alias) => `\`${alias}\``);
                helpEmbed.addField('Aliases', commandAliases.join(', '), false);
            }
            
            message.channel.createEmbed(helpEmbed);
            //Logger.success('HELP', `${message.author.username}#${message.author.discriminator} (${message.author.id}) used the help command for command ${foundCommand.name}.`);
        }
    }
}

module.exports = new Help();