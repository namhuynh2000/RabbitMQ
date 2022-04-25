// import amqp from "amqplib/callback_api.js";
import express from "express";
// import route from "./routes/route.js";
import morgan from "morgan"; // Dung de log
import { connect } from "./connection/socketIO/socket.js";
import getData from "./socket_handle/getData.js";

const port = 5500;

const app = express();

const { io, httpServer } = connect(app);

io.on("connection", (socket) => {
  // ...
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("GET", () => {
    getData(io, socket.id);
  });
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

httpServer.listen(port, () => {
  console.log("server listen on port " + port);
});
// rabbitmq("", { exclusive: true })
//   .then(async (value) => {
//     const { channel, queue } = value;

//     var correlationId = generateUuid();
//     var requestCreate = {
//       type: "create",
//       entity: {
//         title: "New Film",
//         description: "This is a New Film",
//         language_id: 1,
//       },
//     };
//     var requestRead = {
//       type: "read",
//     };
//     var requestUpdate = {
//       type: "update",
//       film_id: 1011,
//       entity: {
//         title: "Film Update",
//         description: "This is a Update Film",
//       },
//     };
//     var requestDelete = {
//       type: "delete",
//       film_id: 1009,
//     };

//     console.log(" [x] Requesting ", requestUpdate);

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
//       Buffer.from(JSON.stringify(requestUpdate)),
//       {
//         correlationId: correlationId,
//         replyTo: queue,
//       }
//     );
//   })
//   .catch((e) => console.log(e));
export default app;
