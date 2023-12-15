const mqtt = require("mqtt");
require("dotenv").config();
const express = require("express");
const app = express();

var options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: process.env.MQTT_PROTOCAL,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clientId: "mqttjs_pappi2",
  clean: false,
};

// initialize the MQTT client
var client = mqtt.connect(options);

client.on("connect", function () {
  console.log("Connected");
  // client.subscribe({topic: 'etoll/carid', options:{qos: 1}});
  // client.subscribe({topic: 'etoll/carid', function (err) {
  //     console.log(err)
  //     console.log('Subscribed')
  // }})
});
client.subscribe("etoll/carid", function () {
  console.log("subscribe");
});

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  // client.end()
});
app.listen(3000, () => {
  console.log("Sever Running at port 3000");
});
