const express = require('express')
const mqtt = require('mqtt')
require('dotenv').config();

const app = express()
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
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    var rfid = message.toString()
    // called each time a message is received
    console.log('Received message:', topic, rfid);
    // publish message 'Hello' to topic 'my/test/topic'
    client.publish('etoll/test',rfid, 1)
});

// subscribe to topic 'my/test/topic'
client.subscribe('carid');

app.listen(3000, () => {
    console.log('Sever Running at port 3000')
})