import amqplib from "amqplib";
import { QUEUES } from "../enums";
import { SearchHistory } from "../entity";

const rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://localhost";

export async function setupRabbitMQConsumer() {
  const queueName = QUEUES.SearchHistoryQueue;

  const connection = await amqplib.connect(rabbitMQUrl);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });

  channel.consume(
    queueName,
    async (msg) => {
      if (msg !== null) {
        try {
          const body = JSON.parse(msg.content.toString());

          const { email, searched_coin } = body;

          //save search history in database
          await SearchHistory.create({
            email,
            searched_coin,
            searched_at: new Date(),
          }).save();

          channel.ack(msg);
        } catch (err) {
          console.error("Error processing message:", err);
          channel.reject(msg, true);
        }
      }
    },
    { noAck: false }
  );
}
