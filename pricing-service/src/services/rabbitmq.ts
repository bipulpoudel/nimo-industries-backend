import amqplib from "amqplib";
import { QUEUES } from "../enums";

const rabbitMQUrl = process.env.RABBITMQ_URL || "amqp://localhost";

const sendMessagetoQueue = async ({
  queueName,
  data,
}: {
  queueName?: QUEUES;
  data: any;
}) => {
  const connection = await amqplib.connect(rabbitMQUrl);
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });

  const message = JSON.stringify(data);

  await channel.sendToQueue(queueName, Buffer.from(message), {
    persistent: true,
  });
};

export default { sendMessagetoQueue };
