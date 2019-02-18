var importConenction = require('../src/createImpConnection')
var exportConnection = require('../src/createExpConnection')
var importResource = require('../src/createImport')
var exportResource = require('../src/createExport')
var flow = require('../src/createFlow')
var crudHandler = require('../Connector-Helpers/crudHandler')
var jsonLoader = require('../Connector-Helpers/jsonLoader')
var resourceOptions={

}
function myConInstaller(){
    
}

myConInstaller.prototype.connectorInstaller = function (options, callback) {
    exportConnection(options, function (error1, response1, data) {
        if (!error1) {
            resourceOptions.exportConnectionId = response1.body._id
            importConenction(options, function (error2, response2, data) {
                if (!error2) {
                    resourceOptions.importConnectionId = response2.body._id
                    flow(options, function (error3, resposne3, data) {
                        if (!error3) {
                            resourceOptions.flowId = resposne3.body._id
                            var config = {
                                bearerToken: options.bearerToken,
                                id: options._integrationId,
                                resourceType: 'integrations',
                                body: jsonLoader('../data/integrationData')
                            }
                            config.body._connectorId = options._connectorId
                            config.body.install[0]._connectionId = response1.body._id
                            config.body.install[1]._connectionId = response2.body._id
                            config.body.settings.sections[0].flows[0]._id = resposne3.body._id
                            crudHandler(config, function (error, response, body) {
                                if (!error){
                                    console.log(JSON.stringify(response));   
                                    callback(null, null)
                                } 
                                else callback(error, null)
                            })
                        }
                        else callback(error3, null)
                    })
                }
                else callback(error2, null)
            })
        }
        else callback(error1, null)
    })
}

myConInstaller.prototype.nsExportInstaller =function(options,callback){
    var responseData={
        success:true,
        stepsToUpdate:[{
            "imageURI": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAACUCAMAAADrljhyAAAAllBMVEX///8AAAATUn22x9X4+PhfX18AQXPL1+Hp7/Po7PBMbpADTXoAOG1vb2+/ztpWVlafn5/S0tLg4ODx8fG4uLh9fX11dXVcepgoKCiPj48ASHjb4+pJSUk4ODjp6eloaGhBQUEbGxvJycmqqqoSEhIxMTGGhoaXl5fAwcKarb4sW4R6k6uGnbM7ZYoAM2uoucgAImMAGV+XUj89AAAEVklEQVR4nO2aaWOiOhRAiSK2dYkQtYgIigtObTtv/v+fm6wQFtHWtoY393yoSXpJjpgVtSwAAAAAAAAAAAAAAAAAAIB/jocLPN5bsMzju9PMfw/3VixBnE4zwzYa98d9jXHffONxtwgYgzEYg3ELjIeDKkYbPzw9V3kZFI0ZxhjTnRDRodkH0g0Kxjajb4yxJYQEquh3oBtzTDLud8eCbr5jODlmGyvGWRnJunJbjK3lS9uMra7TNmPr1Wmbsf0ctMyYduVBy4ytvtMa46V8/eW0xfhJnZ9PQUuMhyeZsN8G7TAOnN/qf4P3dhh3HLXF6LbFePCmnredluUoM407wbNMqy2o8cad4eu5KFONO4PxmShzjQfL+ihjjenos2ujzDXuBKfaKIONO86vuiiTjTtBvybKaOPBSzb6luOMO3nmNBjThcRuvPY+aMbyMYv2SCh4tUmVO78NrYdybN24Ewyr/Llzx2g2rmN456+bwBiMwRiM/5/Gj8si5htXcWq+MdN5N8747amZN+OMHy9h4oYOAAAAAMyn8NuOLG0XqZZo15AocSPtmYT2U5FCRqZq66mtuZ4E9xiuyKU0hyOamIhiSRxZZNYrMY/4JccR4oSLI+EFJMaLrHqvh7cqGeIpey3Xg1nbC609PGk0nor25uJ98dY9mpghHd+zIoxKrFicvdBKDrwSskFxVr2L0CJPcpVyPShRDStm1xgj/vateb3xvs547YkLNr3tdJqOVgj1hLGPRk3GWOAjJBKhy413WBFedY/Rpsn47D2mFptEVORt/euMZVelTZG8147QKrqyHytjUVvReD0fCWiXJQueWPFbPmPpQ8TDpllV0YFcYyxhxnmOGmu564x9r2KcVsNnxX5Gb3zlhvyYMTpUjBfVcF4+z7K9QrM/aLzfsb/up4yn5ZAfMZ7wYRWWjfFEkLrnjFPam5JSv/issXflA3JuvE3kDHdmrthm4SVjm80y4eEY3W68W4eSdc34KRtPhOqanDHOP/mSsZVsZAjeercZa1yxgkws1+f3cvZRY8uNVdA+vcl4M1scJJWhUWdsHdjrrlcw9tcrzr7BmE7D03glhm56i/EHR57okZKL8/G8UkySlK4tO/cnjdmwLxtfnt00PCxHKDVu3Al9mTHBtxlbW7EIWdYerbLCJJ9ovtw4X/0+aUynDTHIaf/ICicIHb/N2MIfNiae9q+pqicWVah4lf4GY7dsvIol82yFKBpH/iRrx47F3pyeSlDWkel9xyriG4zFMnJmf1xvHKJQOrPFB4vllQ69nZhmvLU24XyHseefMd6fM16zbDhLDyGdkH31SRzZm5xNUja797JNwheveYLFxXs8Lxjb230ehN1ipaIw33GUjEcF41hvrtmYnaWxWtNsdqLljaTls7SEnbGxtrJEiexK66P+qbqi1J9qheosLUkxJnru6rP0V0Cimj5IoqhaCAAAAAAAAAAAAAAAAAAA8M/wF95SdjvVbeznAAAAAElFTkSuQmCC",
            "completed": true,
            "name": "NetSuite-Connector Connection2",
            "description": "Please Provide Netsuite Credentials",
            "installerFunction": "nsExportInstaller",
            "_connectionId": resourceOptions.exportConnectionId
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    exportResource(resourceOptions,function(error,response,body){  
        if(!error){
            resourceOptions.expId = response.body._id
            callback(null,responseData)
        }
        else callback(error,null)
    })
}

myConInstaller.prototype.mockableImportInstaller =function(options,callback){
    var responseData = {
        success: true,
        stepsToUpdate: [{
            "imageURI": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4AmiKUdJBKZ9-hmZz-HMtRTqXjK6uxLTQpRSbGT05cM2U2Ltv7g",
            "completed": true,
            "name": "Mockable-Connector Connection",
            "description": "Please Provide Mockable Credentials",
            "installerFunction": "mockableImportInstaller",
            "_connectionId": resourceOptions.importConnectionId
        }]
    }
    resourceOptions.bearerToken = options.bearerToken
    importResource(resourceOptions, function (error, response, body) {
        if (!error) {
            resourceOptions.impId = response.body._id
            updateIntegration(options, function (err, res, bdy) {
                if (!err) callback(null, responseData)
                else callback(err, null, null)
            })
        }
        else callback(error, null)
    })
}

myConInstaller.prototype.connectorUpdate =function(options,callback){

}

var updateIntegration = function(options,callback){
    var conf={
        bearerToken:options.bearerToken,
        resourceType:'integrations',
        id:options._integrationId ,
        body:{}
    }
    updateFlow(options,function(error,response,body){
        if(!error)  console.log('\nFlow Updated\n'+JSON.stringify(response)+'\n');
        else console.log('\nFlow Updated Failed\n'+JSON.stringify(response)+'\n');
    })
    crudHandler(conf,function(error,response,body){
        if(!error){
            conf.body =response.body
            conf.body.mode ='settings'
            crudHandler(conf,function(err,res,bdy){
                callback(err,res,bdy)
            })
        }
        else callback(error,null,null)
    })
}
var updateFlow=function(options,callback){
    var conf={
        bearerToken:options.bearerToken,
        resourceType:'flows',
        id:resourceOptions.flowId,
        body:{}
    }
    crudHandler(conf,function(error,response,body){
        if(!error){
            conf.body =response.body
            conf.body._exportId=resourceOptions.expId
            conf.body._importId=resourceOptions.impId
            //conf.body.disabled=false
            crudHandler(conf,function(err,res,bdy){
                callback(err,res,bdy)
            })
        }
        else callback(err,null,null)
    })
}

module.exports =myConInstaller