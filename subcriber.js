import amqp from "amqplib/callback_api.js";

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      function (error2, q) {
        if (error2) {
          throw error2;
        }
        var correlationId = generateUuid();
        var requestCreate = {
          type: 'create',
          entity: {
            title: 'New Film',
            description: 'This is a New Film',
            language_id: 1
          }
        }
        var requestRead = {
          type: 'read',
        }
        var requestUpdate = {
          type: 'update',
          entity: {
            film_id: 1010,
            title: 'New Film Update',
          }
        }
        var requestDelete = {
          type: 'delete',
          film_id: 1009
        }

        console.log(" [x] Requesting ", requestCreate);

        channel.consume(
          q.queue,
          function (msg) {
            if (msg.properties.correlationId == correlationId) {
              console.log(" [.] Got %s", msg.content.toString());
              setTimeout(function () {
                connection.close();
                process.exit(0);
              }, 500);
            }
          }
          // {
          //   noAck: true,
          // }
        );

        channel.sendToQueue("rpc_queue", Buffer.from(JSON.stringify(requestCreate)), {
          correlationId: correlationId,
          replyTo: q.queue,
        });
      }
    );
  });
});

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
