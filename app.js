require('dotenv').config();
// const express = require('express')
// const to = require('await-to-js').default;
const broker = require('./src/broker/broker');

// const server = require('net').createServer(broker.handle)
const server = require('net').createServer(broker.handle);
const port = process.env.PORT ? process.env.PORT : 8883;

(async () => {


  server.listen(port, '0.0.0.0', function () {
    console.log('🚀  Server listening on port: ', port)
  });
})();

// Export the Express API
module.exports = server