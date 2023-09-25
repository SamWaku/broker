// const mq = require('../client')
var amqp = require('amqplib/callback_api');
const WebSocket = require('ws');

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
            const client = new WebSocket('ws://localhost:8080');

            // Event handler for when the client connection is established
            client.on('open', () => {
              console.log('Connected to the server.');

              // Send data to the server
              client.send(msg);

              // Close the connection after sending the message
              client.close();
            });
            
            break;

        default: break;
    }
}

module.exports.MsgHandle = HandleMsg;