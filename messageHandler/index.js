const callHandler = require('./callHandler');

// get command if message is type of command it will return that command or else it will return null
const getCommand = (message) => {
    const command = message.body.split(' ')[0].trim()
    if(command.startsWith('#')) {
        return command.toLowerCase();
    }
    return null
}

module.exports = async (message) => {
    const command = getCommand(message);

    // if type command then proceed
    if(command) {
        const registeredCommands = Object.entries(callHandler) // ['#gpt', { execute: () => {} },]

        // register all that command at once
        registeredCommands.forEach((currCommand) => {
            if(command === currCommand[0]) {
                const execute = currCommand[1]['execute']
                execute(message);
            }
        })

        if(!Object.hasOwn(callHandler, command)) {
            message.reply(`Aisa to kch nahi hota😑, ${message._data.notifyName}`)
        }
    }
}