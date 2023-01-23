// const mq = require('../client')


function HandleMsg(topic, msg){

    // console.log(`Topic -> ${topic}`);
    // console.log(`Msg -> ${msg}`);

    // const msgObj = JSON.parse(msg); 
    switch (topic) {
        case 'etoll/carid':
            //let Sid = msg
            console.log(`Msg -> ${msg}`);
            // client.publish('etoll/test', msg)
            break;
        case 'smartbin/status':
            console.log('topic 2')

            break;

        default: break;
    }
}

module.exports.MsgHandle = HandleMsg;