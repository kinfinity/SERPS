const redis = require('redis')
import {promisify} from 'util'
var assert = require('assert')

// create and connect redis client to local instance.
const  options = {
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection')
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted')
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000)
    }
}
const client = redis.createClient(options)
// error Handling
client.on('error', function (err) {
    assert(err instanceof Error)
    assert(err instanceof redis.AbortError)
    assert(err instanceof redis.AggregateError)
    // The set and get get aggregated in here
    assert.strictEqual(err.errors.length, 2)
    assert.strictEqual(err.code, 'NR_CLOSED')
})

// rebind and Promisify get and set
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)
const RedisCache = {getAsync,setAsync} 

export default RedisCache