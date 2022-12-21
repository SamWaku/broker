var mqtt = require('mqtt')
var dontenv = require('dotenv')
var amqp = require('amqplib/callback_api');
const cors = require('cors');
const express = require('express')

dontenv.config()

const app = express()
const PORT = 4000
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4000","https://etoll-handler.vercel.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.set("Content-Security-Policy", "default-src 'self'");
    res.setHeader(
        'Content-Security-Policy-Report-Only',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
      );
      next();
      
  });
app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

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


amqp.connect(process.env.AMQP_URL, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'etoll';
    //var msg = 'Hello World!';

    channel.assertQueue(queue, {
      durable: false
    });
    app.get('/', (req, res) =>{

        res.send('<h1>E-Toll API running 🥳</h1>')
        client.on('message', function (topic, message) {
            // called each time a message is received
            rfid=message.toString()
            
                console.log('Received message:', rfid);
                channel.sendToQueue(queue, Buffer.from(rfid));
                client.publish('etoll/test',rfid, 1)
                console.log(" [x] Sent %s", rfid);
             
        });
    })
  });

  
});


  

// Export the Express API
module.exports = app