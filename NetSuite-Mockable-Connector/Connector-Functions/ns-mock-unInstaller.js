

function myConUnistaller(){

}
myConUnistaller.prototype.preUninstallFunction = function(options,callback){

    var responseData = {
        success: true,
        stepsToUpdate: []
    }
    callback(null, responseData)

}
myConUnistaller.prototype.connectorUninstaller = function (options, callback) {
    
    
    var json = {
        'name': 'NetSuite Connector Unistaller',
        'uninstall': [
            {
                'completed': 'false',
                'name': 'NetSuite-Connector Integration',
                'description': 'Uninstall Integration',
                'uninstallerFunction': uninstallIntegratorFunction,
            }
        ]
    }
    deleteResource(options.bearerToken,'connectors', '5c658e87e0da9762a1ed7938', function (err, response) {
        if (error) {
            callback(error, null)
        }
        else callback(null, null)
    })

}
myConUnistaller.prototype.uninstallIntegratorFunction = function (options, callback) {

    deleteResource(options.bearerToken,'integrators', options._integrationId , {}, function (error, response) {
        if (error) {
            callback(error, null)
        }
        else {
            var responseData = {
                success: true,
                stepsToUpdate: []
            }
            callback(null, responseData)
        }
    })

}
module.exports = myConUnistaller