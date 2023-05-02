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
var data=''
let count = 0;
let prevCount = 0;
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
    
    // called each time a message is received
    
    // arr.push(rfid)
    // if(rfid.length > 0){
      
      count++
      new Promise ((res, rej)=>{
        data += '['
        data += rfid
        data += ','
        res()

      });
      if(data.length > 0){
        // arr.push(data)
        data = data.slice(0, -1)
        data +=']'
        data = data.replace('][', ',')
        let act = JSON.parse(data)
        console.log(act)
        console.log('wait...')
        data += ''
      }
      // prevCount = count
      // for(i=0;i<count;i++){
      //   console.log('for value: ', i)
      // }
      // count=0
      // if(prevCount === count){
      //   console.log('counter stopped')
      // }
      // console.log('prev: ', prevCount)

      // col(data)
      // async function val(params) {
      //   let listener1 = new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve(data);
      //     }, 1000);
      //   });
      //   let dat = await Promise.all(listener1)
        // console.log(data)



});



app.listen(3000, () => {
    console.log('Sever Running at port 3000')
})

async function col(res){
  console.log(res)
}


//RFID 1
// cc ff ff 20 5 10 0 30 0 e2 80 69 95 0 0 40 6 bc 59 85 2 bc d3

// // RFID 2
// cc ff ff 20 5 10 0 30 0 e2 80 69 95 0 0 50 6 bc 59 81 2 b8 cb

// //RFID 3
// cc ff ff 20 5 10 0 30 0 e2 80 69 95 0 0 50 6 bc 59 7d 2 ba cd

// // RFID 4
// cc ff ff 20 5 10 0 30 0 e2 0 0 20 66 11 2 72 18 40 ec b4 bd 2f



// module.exports = {
//     apps : [{
//       name   : "etollbroker",
//       script : "npm start"
//     }]
//   }