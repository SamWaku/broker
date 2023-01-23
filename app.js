require('dotenv').config();
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})


// const to = require('await-to-js').default;
const broker = require('./src/broker/broker');

const server = require('net').createServer(broker.handle)
const port = 8883;

app.listen(port, '0.0.0.0', function () {
    console.log('🚀  Server listening on port: ', port)
  });
// (async () => {

//   server.

//   server.listen(port, '0.0.0.0', function () {
//     console.log('🚀  Server listening on port: ', port)
//   });
// })();

