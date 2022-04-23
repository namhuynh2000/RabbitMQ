import amqp from 'amqplib/callback_api.js'
import { Create } from './module.js'

amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'rpc_queue';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.prefetch(1);
        console.log(' [x] Awaiting RPC requests');
        channel.consume(queue, function reply(msg) {
            var name = JSON.parse(msg.content);

            console.log("name: ", name);
            Create(name);

            channel.sendToQueue(msg.properties.replyTo,
                Buffer.from('success'), {
                correlationId: msg.properties.correlationId
            });

            channel.ack(msg);
        });
    });
});

