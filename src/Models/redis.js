import {createClient} from 'redis';

const redisClient = createClient();
const DEFAULT_EXPIRATION = 3600;

//Redis Connection
(
    async () => {
        await redisClient
            .on('error', err => console.log('Redis client error', err))
            .connect();
    }
)();

export default redisClient;