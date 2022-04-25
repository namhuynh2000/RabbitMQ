import rabbitmq from "../connection/rabbitmq/amqp.js";

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}

export default function (io, socketID, payload) {
  rabbitmq("POST", { durable: false, autoDelete: true })
    .then(async (value) => {
      const { channel, queue } = value;
      var correlationId = generateUuid();
      var requestRead = {
        type: "create",
        entity: payload.entity,
      };
      channel.consume(
        queue,
        function (msg) {
          if (msg.properties.correlationId == correlationId) {
            // console.log(" [.] Got %s", msg.content.toString());
            const data = JSON.parse(msg.content);
            io.to(socketID).emit("POST-res", data);
            // setTimeout(function () {
            channel.close();
            //   process.exit(0);
            // }, 500);
          }
        },
        {
          noAck: true,
        }
      );
      channel.sendToQueue(
        "rpc_queue",
        Buffer.from(JSON.stringify(requestRead)),
        {
          correlationId: correlationId,
          replyTo: queue,
        }
      );
    })
    .catch((e) => console.log(e));
}
