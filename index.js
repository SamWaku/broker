const express = require('express')
const mqtt = require('mqtt')
require('dotenv').config();

const app = express()
var options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: process.env.MQTT_PROTOCAL,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: 'mqttjs_pappi',
    clean: false,
}

// initialize the MQTT client
var client = mqtt.connect(options);
var arr=[]
// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    var rfid = message.toString()
    i=0
    // called each time a message is received
    // console.log('Received message:', topic, rfid);
    // publish message 'Hello' to topic 'my/test/topic'
    // client.publish('etoll/test',rfid, 1)
    arr.push(rfid);
    if(arr.length > 0){
        while(arr.length != 0){
            console.log(arr.shift())
            i--;  
        }
        // console.log('---------------actaual data-----------')
        // console.log('-------------------------------------')
        // console.log('---------------popped data-----------')
        // console.log(arr.shift)
    }
    client.publish({
      topic: 'etoll/test',
      message: rfid,
      options:{
        qos: 2,
      }
      
      //messageId: 2
    });
});

// subscribe to topic 'my/test/topic'

client.subscribe({topic: 'etoll/carid', options:{qos: 1}});
// client.subscribe('etoll/test', {qos: 2});

app.listen(3000, () => {
    console.log('Sever Running at port 3000')
})