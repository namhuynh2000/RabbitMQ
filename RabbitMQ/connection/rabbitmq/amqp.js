import amqp from "amqplib";

// const connection =  amqp.connect('amqp://localhost');

async function connection(queue, config) {
  try {
    const conn = await amqp.connect("amqp://localhost?heartbeat=5s");
    const ch = await conn.createChannel();
    const q = await ch.assertQueue(queue, config);
    return {
      channel: ch,
      queue: q.queue,
    };
  } catch (e) {
    console.log(e);
  }
}

export default connection;
