// const mq = require('../client')
var amqp = require('amqplib/callback_api');

//function to handle emiting messages to rabbitmq
function HandleMsg(topic, msg){
    switch (topic) {
        case 'etoll/status':
            console.log(`Msg -> ${msg}`);
            break;
        case 'etoll/rfid':
            //connect to amqp and send queue
            amqp.connect(process.env.AMQP_URL, function(error0, connection) {
                if (error0) {
                  throw error0;
                }
                connection.createChannel(function(error1, channel) {
                  if (error1) {
                    throw error1;
                  }
                  var queue = 'etoll';
              
                  channel.assertQueue(queue, {
                    durable: false
                  });
                  // called each time a message is received
                rfid=msg
                //message sent to amqp
                channel.sendToQueue(queue, Buffer.from(rfid));
                console.log(" [x] Sent %s", rfid);
              })
            })
            break;

        default: break;
    }
}

module.exports.MsgHandle = HandleMsg;