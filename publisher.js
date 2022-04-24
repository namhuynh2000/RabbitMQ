import rabbitmq from "./connection/rabbitmq/amqp.js";
// import { Create } from "./model.js";

rabbitmq
  .then(async (value) => {
    const { channel, queue } = value;

    channel.prefetch(1);
    channel.consume(queue, function reply(msg) {
      const req = JSON.parse(msg.content);

      //   Handle request here
      console.log("abc");
      console.log(req);

      //   Send response
      channel.sendToQueue(msg.properties.replyTo, Buffer.from("success"), {
        correlationId: msg.properties.correlationId,
      });

      channel.ack(msg);
    });
  })
  .catch((e) => console.log(e));
