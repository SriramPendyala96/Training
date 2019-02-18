var crudHelper = require('../Connector-Helpers/crudHandler')

function createFlow(options,callback){
    var config={
        bearerToken:options.bearerToken,
        resourceType:'flows',
        body:{
            "name": "NS-Mockable-Connector-Flow",
            //"disabled": true,
            "_integrationId": options._integrationId,
            "skipRetries": false
        }
    }
    crudHelper(config,function(error,response,body){
        if(!error){
            console.log('\nFlow Created\n'+JSON.stringify(response)+'\n');
            callback(null,response,body)            
        }
        else{
            console.log('\nFlow Failed\n'+JSON.stringify(error)+'\n');
            callback(error,null,null)
        }
    })
}
module.exports = createFlow