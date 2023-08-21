# WhatsApp Bot - Command Executioner

This whataspp bot is tailored for different usecase right now e.g.

- to add tasks
- to query gpt models...

But you can tailor this bot as per your own usecase. It uses `whatsapp-web.js` behind the scene

Currently its required these `.env`:

```
MONGO_CONNECTION="mongos_uri"
MONGO_PASSWORD="xxx"
OPENAI_API_KEY="sk-xxx"
```

But you can `remove` those who you don't need. but let's talk about how you can make modification and how
it works...

Currently it follows this format:

```
#<command> [Description]
```

For example: there is command called `#gpt question` that you can use it in this way:

`#gpt who is elon musk` or `#gpt what is quantum entaglement`, etc.

### Register Command

To add and remove you own custom commands, visit `messageHandler/callHandler.js` and there add new command as property...

value of this property should be a function that will be executed when the command is called.
For example if you want to add a command `#test` then you can do it in this way:

```.js
// this is the place where you will define all your commands and related functions
...
module.exports = {
    // ...above code

    '#test': {
        execute: testFunction
    }
}
```

and then you can define this `testFunction` inside `messageHandler/executioner.js`

```.js
// this function takes `message` object by default

exports.testFunction = async (message) => {
    try {
        message.reply('we have recieved your message')
    } catch(err) {
        message.reply(`error: ${err.message}`)
    }
}
```

Now just run the script using `node index.js` and scan qr code and test it with another whatsapp by sending message like:

`#test hey`

and you will receive the following message:

`we have recieved your message`

Thanks, I know its quirky🥴, but it works :)