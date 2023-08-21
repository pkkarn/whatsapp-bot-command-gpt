const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const connectDB = require('./db')
const messageHandler = require('./messageHandler')

const client = new Client();

client.on('qr', (qr) => {
    // QR code ko terminal me display karega
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    connectDB()
});

client.on('message', messageHandler);

client.initialize();
