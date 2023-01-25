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
    client.subscribe('etoll/rfid', {qos: 1}, function(){
        console.log('subscribed')
      });
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    var rfid = message.toString()
    i=0
    // called each time a message is received
    console.log('Received message:', topic, rfid);
    // publish message 'Hello' to topic 'my/test/topic'
    // client.publish('etoll/test',rfid, 1)
    // arr.push(rfid);
    // if(arr.length > 0){
    //     while(arr.length != 0){
    //         console.log(arr.shift())
    //         // send.to.mongodb(arr.shift())
    //         i--;  
    //     }
    //     // console.log('---------------actaual data-----------')
    //     // console.log('-------------------------------------')
    //     // console.log('---------------popped data-----------')
    //     // console.log(arr.shift)
    // }
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


// client.subscribe('etoll/test', {qos: 2});

app.listen(3000, () => {
    console.log('Sever Running at port 3000')
})




//RFID 1
// cc ff ff 20 5 10 0 30 0 e2 80 69 95 0 0 40 6 bc 59 85 2 bc d3

// // RFID 2
// cc ff ff 20 5 10 0 30 0 e2 80 69 95 0 0 50 6 bc 59 81 2 b8 cb

// //RFID 3
// cc ff ff 20 5 10 0 30 0 e2 80 69 95 0 0 50 6 bc 59 7d 2 ba cd

// // RFID 4
// cc ff ff 20 5 10 0 30 0 e2 0 0 20 66 11 2 72 18 40 ec b4 bd 2f