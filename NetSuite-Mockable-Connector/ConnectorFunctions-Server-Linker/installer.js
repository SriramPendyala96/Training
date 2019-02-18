var myInstaller = require('../Connector-Functions/ns-mock-installer')
var mySettings = require('../Connector-Functions/ns-mock-settings')
var myUnInstaller = require('../Connector-Functions/ns-mock-unInstaller')


function installerLinker(){

}

installerLinker.prototype.installer = new myInstaller()
installerLinker.prototype.settings = new mySettings()
installerLinker.prototype.unInstaller = new myUnInstaller()


module.exports = installerLinker