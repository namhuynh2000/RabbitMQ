import rabbitmq from "./connection/rabbitmq/amqp.js";
import CRUD from "./model/film.model.js";

rabbitmq("rpc_queue", { durable: false, exclusive: false })
  .then(async (value) => {
    const { channel, queue } = value;
    console.log("connected to rabbitmq");
    channel.consume(queue, async function reply(msg) {
      const req = JSON.parse(msg.content);

      //   Handle request here
      console.log(req);
      var { type } = req;
      console.log("type: ", type);
      let data;
      let result;
      switch (type) {
        case "create":
          data = await CRUD().Create(req.entity);
          break;
        case "read":
          data = await CRUD().Read();
          break;
        case "update":
          result = await CRUD().Update(req.film_id, req.entity);
          data = { affected: result };
          break;
        case "delete":
          result = await CRUD().Delete(req.film_id);
          data = { affected: result };
          break;
        default:
          throw new Error("No valid type");
      }
      channel.ack(msg);

      //   Send response
      channel.sendToQueue(
        msg.properties.replyTo,
        Buffer.from(JSON.stringify(data)),
        {
          correlationId: msg.properties.correlationId,
        }
      );
    });
  })
  .catch((e) => console.log(e));
