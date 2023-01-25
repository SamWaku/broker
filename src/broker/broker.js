//import aedes
const aedes = require('aedes')
//import authentication credentials
const AuthStore = require('./aedesAuthStore')

//client Message handler
const Msghandler = require('./clientMsgHandler')

//initialize broker credentials and connection
const broker = aedes({
    authenticate(client, username, password, callback){
        // let error = null;
        password = Buffer.from(password, 'base64').toString();
        let res = AuthStore.filter(device => device.user === username && device.pass === password)
        // console.log(res.length)
        console.log(res.length)

          if (res.length > 0) {
            return callback(null, true);
          }
          const error = new Error('Authentication Failed!! Invalid user credentials.');
          console.log('Error ! Authentication failed.')
          return callback(error, false)
    }
})

//On client connected
broker.on('connackSent', function(check, client){
    console.log('Connected to client: %s', client.id);
});

//ON client subscribed
broker.on('subscribe', function(subscriptions, client){
    if(client){
        console.log('%s subscribed to', client.id, subscriptions);
        // console.log(subscriptions)
    }
});

//on client error
broker.on('clientError', function(client, err){
    console.log('client error: ', client.id, err.message, err.stack);
})

//on connection error
broker.on('connectionError', function(client, err){
    console.log('Connection error: client: %s', client.id, err.message);
})

//on client publish
broker.on('publish', function(packet, client){
    Msghandler.MsgHandle(packet.topic, packet.payload);
    if (client) {
        // console.log('%s : topic %s : %s', client.id, packet.topic, packet.payload);
      }
});

//on client sudscriber received data
broker.on('ack', function(message, client){
    console.log('%s Acknoledged message', client.id);
});

//On client disconnected
broker.on('clientDisconnect', function(client){
    console.log('%s Disconnected', client.id);
});

//export broker
module.exports = broker;