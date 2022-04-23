import amqp from 'amqplib'

// const connection =  amqp.connect('amqp://localhost');

async function connection() {
    try {
        const conn = await amqp.connect('amqp://localhost?heartbeat=5s')
        const ch = await conn.createChannel()
        const queue = await ch.assertQueue('', {
            exclusive: true
        })
        return {
            ch,
            queue
        };
    }
    catch (e) {
        console.log(e)
    }
}

export default connection()