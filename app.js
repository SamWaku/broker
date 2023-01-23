require('dotenv').config();

// const to = require('await-to-js').default;
const broker = require('./src/broker/broker');

const server = require('net').createServer(broker.handle)
const port = 8883;

(async () => {


  server.listen(port, '0.0.0.0', function () {
    console.log('🚀  Server listening on port: ', port)
  });
})();
