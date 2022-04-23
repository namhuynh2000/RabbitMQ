import amqp from 'amqplib/callback_api.js'
import rabbitMQ from './amqp.js'


// var correlationId = generateUuid();
//       var name = {
//           type: '',
//           title: 'film naruto',
//           language_id: 1,
//       }

// rabbitMQ.consume('log', function (msg) {
//     if (msg.properties.correlationId == correlationId) {
//         console.log(' [.] Got %s', msg.content.toString());
//         setTimeout(function () {
//             connection.close();
//             process.exit(0)
//         }, 500);
//     }
// }, {
//     noAck: true
// });


// rabbitMQ.sendToQueue('rpc_queue',
//         Buffer.from(JSON.stringify(name)),{
//           correlationId: correlationId,
//           replyTo: 'log' });

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    channel.assertQueue('', {
      exclusive: true
    }, function(error2, q) {
      if (error2) {
        throw error2;
      }
      var correlationId = generateUuid();
      var name = {
          title: 'film naruto',
          language_id: 1,
      }

      console.log(' [x] Requesting ', name);

      channel.consume(q.queue, function(msg) {
        if (msg.properties.correlationId == correlationId) {
          console.log(' [.] Got %s', msg.content.toString());
          setTimeout(function() {
            connection.close();
            process.exit(0)
          }, 500);
        }
      }, {
        noAck: true
      });

      channel.sendToQueue('rpc_queue',
        Buffer.from(JSON.stringify(name)),{
          correlationId: correlationId,
          replyTo: q.queue });
    });
  });
});

function generateUuid() {
  return Math.random().toString() +
         Math.random().toString() +
         Math.random().toString();
}
