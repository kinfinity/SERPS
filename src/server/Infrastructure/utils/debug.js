const debug = require('debug')

debug.log('Test the debugger')

const serverLogger = debug('http:serverLogger')

serverLogger.enabled = true
serverLogger.useColors = true

console.log(serverLogger)

//  export default serverLogger