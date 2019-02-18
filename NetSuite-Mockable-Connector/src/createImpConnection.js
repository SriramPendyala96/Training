var crudHandler = require('../Connector-Helpers/crudHandler')


function createImpConncetion(options,callback){
    var config={
        bearerToken:options.bearerToken,
        resourceType:'connections',
        body:{
            "type":"rest",
            "name":"My-Connector-Mockable-Connections",
            "rest":{
                "mediaType":"json",
                "authType":"basic",
                "basicAuth": {
                    "username": "sriram.pendyala@celigo.com",
                    "password": "8333934696Sriram"
                }
            }
        }
    }
    crudHandler(config,function(error,response,body){
        if(!error){
            console.log('\nImportConnection Success\n'+JSON.stringify(response)+'\n');
            callback(null,response,body)
        }
        else{
            console.log(('\nImportConnection Failed\n'+JSON.stringify(error)+'\n'));
            callback(error,null,null)
        }
    })
}
module.exports = createImpConncetion