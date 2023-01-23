var mqtt = require('mqtt')
var options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: 'mqtts',
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
}

// initialize the MQTT client
var mqttclient = mqtt.connect(options);

module.exports.clihandle = mqttclient;