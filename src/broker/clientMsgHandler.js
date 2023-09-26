// const mq = require('../client')
var amqp = require('amqplib/callback_api');
const io = require('socket.io-client');

//function to handle emiting messages to rabbitmq
function HandleMsg(topic, msg){
    switch (topic) {
        case 'etoll/status':
            console.log(`Msg -> ${msg}`);
            break;
        case 'etoll/rfid':
            // console.log(" Pappi Sent %s", msg);
            //connect to websocket
            // Create a WebSocket client
            const socket = io.connect('https://etollapi.samwaku.com/');

            // Event handler for when the client connection is established
            socket.on('connect', () => {
              console.log('Connected to the server.');

              // Send data to the server
              socket.emit('message', msg);
              console.log(`Data sent ${msg}`)

              socket.disconnect();
            });
            
            break;

        default: break;
    }
}

module.exports.MsgHandle = HandleMsg;