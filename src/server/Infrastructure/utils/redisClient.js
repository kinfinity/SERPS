const redis = require('redis');

const app = express();

// create and connect redis client to local instance.
const client = redis.createClient();