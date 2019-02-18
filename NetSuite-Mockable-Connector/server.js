var expressExtension = require('express-integrator-extension')
var NS_MC_functions = require('./installWrapper')
var systemToken = 'd168ce43a64642519991027825fde574'

var config = {
    connectors: {
        '5c6824cb6f8a800e81aa434f': NS_MC_functions
    },
    systemToken: systemToken,
    port: 9000
}

expressExtension.createServer(config, function (error, response, body) {
    if (!error) {
        console.log('\nServer Online!!!')
    }
    else console.log('\n' + JSON.stringify(error) + '\nServer Offline!!!')
})