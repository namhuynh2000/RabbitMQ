import rabbitmq from "./connection/rabbitmq/amqp.js";
import CRUD from "./model/film.model.js";

rabbitmq('rpc_queue', { durable: false })
  .then(async (value) => {
    const { channel, queue } = value;

    channel.consume(queue, function reply(msg) {
      const req = JSON.parse(msg.content);

      //   Handle request here
      console.log(req);
      var { type } = req;
      console.log("type: ", type);
      switch (type) {
        case 'create':
          CRUD().Create(req.entity);
          break;
        case 'read':
          CRUD().Read();
          break;
        case 'update':
          CRUD().Update(req.film_id, req.entity);
          break;
        case 'delete':
          CRUD().Delete(req.film_id);
          break;
        default:
          throw new Error('No valid type');
      }
      channel.ack(msg);

      //   Send response
      channel.sendToQueue(msg.properties.replyTo, Buffer.from("success"), {
        correlationId: msg.properties.correlationId,
      });
    });


  })
  .catch((e) => console.log(e));
