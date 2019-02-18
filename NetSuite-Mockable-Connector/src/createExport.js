var crudHandler = require('../Connector-Helpers/crudHandler')


function createExport(options,callback){
    var config={
        bearerToken:options.bearerToken,
        resourceType:'exports',
        body:{
            "name": "Net Suite Export-Connector",
            "_connectionId": options.exportConnectionId,
            "asynchronous": true,
            "parsers": [],
            "sampleData": [
                {
                    "Celigo Shirt Color": "",
                    "Gender": "",
                    "Size": "",
                    "Price View": "",
                    "Dynamic SKU": "",
                    "satish_cust_item_1": "",
                    "Engineering Status": "",
                    "Base Price": "",
                    "Type": "Inventory Item",
                    "Description": "",
                    "Display Name": "",
                    "Name": "munch",
                    "recordType": "inventoryitem",
                    "id": "6956"
                }
            ],
            "netsuite": {
                "type": "restlet",
                "skipGrouping": false,
                "statsOnly": false,
                "restlet": {
                    "recordType": "item",
                    "searchId": "customsearch_sriram_forstackflow_itemsav",
                    "batchSize": 20,
                    "criteria": []
                },
                "distributed": {
                    "disabled": false,
                    "forceReload": false,
                    "executionType": [],
                    "executionContext": []
                }
            },
            "transform": {
                "type": "expression",
                "expression": {
                    "rules": [],
                    "version": "1"
                },
                "version": "1",
                "rules": []
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
            "adaptorType": "NetSuiteExport"
        }
    }
    crudHandler(config,function(error,response,body){
        if(!error){
            console.log('\nExport Created\n'+JSON.stringify(response)+'\n');
            callback(null,response,body)
        }
        else{
            console.log('\nExport Failed\n'+JSON.stringify(error)+'\n');
            callback(error,null,null)
        }
    })
}
module.exports = createExport