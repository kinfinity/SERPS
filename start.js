require('babel-register')({
    presets: [
        'env',
    ],
    plugins: [
        '@babel/plugin-transform-async-to-generator'
    ]
});

module.exports = require('./src/server')
