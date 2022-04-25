import express from "express";
import rabbitmq from "../connection/rabbitmq/amqp.js";

const router = express.Router();

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
router.get("/", (req, res) => {
  // rabbitmq("", { exclusive: true })
  //   .then(async (value) => {
  //     const { channel, queue } = value;

  //     var correlationId = generateUuid();

  //     var requestRead = {
  //       type: "read",
  //     };

  //     channel.consume(
  //       queue,
  //       function (msg) {
  //         if (msg.properties.correlationId == correlationId) {
  //           console.log(" [.] Got %s", msg.content.toString());
  //           setTimeout(function () {
  //             channel.close();
  //             process.exit(0);
  //           }, 500);
  //         }
  //       }
  //       // {
  //       //   noAck: true,
  //       // }
  //     );

  //     channel.sendToQueue(
  //       "rpc_queue",
  //       Buffer.from(JSON.stringify(requestRead)),
  //       {
  //         correlationId: correlationId,
  //         replyTo: queue,
  //       }
  //     );
  //   })
  //   .catch((e) => console.log(e));

  res.send("Hi");
});

export default router;
