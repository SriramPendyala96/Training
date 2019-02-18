

function myConSettings(){

}
myConSettings.prototype.persistSettings = function (options, callback) {
    console.log('\noptions\n'+JSON.stringify(options.pending)+'\n');

    var responseData = {
        success: true,
        pending:options.pending
    }
    console.log('\nresponse\n'+JSON.stringify(responseData)+'\n');
    return callback(null, responseData)

}
myConSettings.prototype.refreshMetadata = function (options, callback) {
    var responseData = {

    }
    callback(null, responseData)
}
myConSettings.prototype.changeEdition = function (options, callback) {
    callback(null, null)
}
myConSettings.prototype.getMappingMetadata = function (options, callback) {

    var responseData = [
        {
            importId: [
                {
                    requiredGenerateFields: [

                    ],
                    nonEditableGenerateFields: [
      
                    ]
                },
                {
                    generateList: '',
                    requiredGenerateFields: [

                    ],
                    nonEditableGenerateFields: [

                    ]
                }
            ]
        }
    ]
    callback(null, responseData)
}
module.exports =myConSettings