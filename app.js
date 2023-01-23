require('dotenv').config();
const express = require('express')



// const to = require('await-to-js').default;
const broker = require('./src/broker/broker');

const server = require('net').createServer(broker.handle)
const port = 8883;

server.listen(port);

// Export the Express API
module.exports = server