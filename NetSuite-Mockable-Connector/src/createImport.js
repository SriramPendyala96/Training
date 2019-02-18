var crudHandler = require('../Connector-Helpers/crudHandler')

function createImport(options,callback){
    var config = {
        bearerToken: options.bearerToken,
        resourceType: 'imports',
        body: {
            "name": "Mockable import-Connector",
            "_connectionId": options.importConnectionId,
            "parsers": [],
            "sampleData": {
                "Name": "",
                "Email": "",
                "Keyword Search": "",
                "Phone": "",
                "Priority": "",
                "Search Engine": "",
                "id": "",
                "recordType": ""
            },
            "distributed": false,
            "mapping": {
                "fields": [
                    {
                        "extract": "Name",
                        "generate": "Name"
                    },
                    {
                        "extract": "Email",
                        "generate": "Email"
                    },
                    {
                        "extract": "[Keyword Search]",
                        "generate": "Keyword Search"
                    },
                    {
                        "extract": "Phone",
                        "generate": "Phone"
                    },
                    {
                        "extract": "Priority",
                        "generate": "Priority"
                    },
                    {
                        "extract": "[Search Engine]",
                        "generate": "Search Engine"
                    },
                    {
                        "extract": "id",
                        "generate": "id"
                    },
                    {
                        "extract": "recordType",
                        "generate": "recordType"
                    }
                ]
            },
            "rest": {
                "relativeURI": [
                    "Get/Item"
                ],
                "method": [
                    "POST"
                ],
                "body": [
                    ""
                ],
                "responseIdPath": [
                    ""
                ],
                "successPath": [
                    ""
                ]
            },
            "filter": {
                "type": "expression",
                "expression": {
                    "rules": [],
                    "version": "1"
                },
                "version": "1",
                "rules": []
            },
            "adaptorType": "RESTImport"
        }
    }
    crudHandler(config,function(error,response,body){
        if(!error){
            console.log('\nImport Created\n'+JSON.stringify(response)+'\n');
            callback(null,response,body)
        }
        else{
            console.log('\nImport Failed\n'+JSON.stringify(error)+'\n');
            callback(error,null,null)
        }
    })
}
module.exports = createImport