import Redis from 'ioredis';
import { v4 } from 'uuid';
export const redis = new Redis({
  port: 6379, // Redis port
  host: 'redis', // Redis host
  username: 'default', // needs Redis >= 6
  db: 0, // Defaults to 0
});
export const confirmationEmail = async (userId: string) => {
  const id = v4();
  await redis.set(id, userId, 'EX', 60 * 60 * 15);
  const link = `http://localhost:${process.env.PORT}/user/confirm/${id}`;
  console.log(link);
  return link;
};
