var mqtt = require('mqtt')
var dontenv = require('dotenv')
var amqp = require('amqplib/callback_api');

dontenv.config()

var options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected to Broker');
});

client.on('error', function (error) {
    console.log(error);
});



// subscribe to topic 'my/test/topic'
client.subscribe('etoll/vid');

// publish message 'Hello' to topic 'my/test/topic'
//client.publish('my/test/topic', 'Hello');
amqp.connect(process.env.AMQP_URL, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'etoll';
    var msg = 'Hello World!';

    channel.assertQueue(queue, {
      durable: false
    });
    client.on('message', function (topic, message) {
        // called each time a message is received
        rfid=message.toString()
        console.log('Received message:', rfid);
        channel.sendToQueue(queue, Buffer.from(rfid));
        console.log(" [x] Sent %s", rfid);
    });
  });

  
});