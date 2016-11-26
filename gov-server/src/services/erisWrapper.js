'use strict';

var erisContracts = require('eris-contracts'),
      solc = require('solc'),
      accounts = require("./accounts.js").accounts,
      nodes = require("./ips.js").ips,
      account = accounts[0].address,
      erisDbFactory = require('eris-db');

module.exports = (function initialize() {
	
	var contractInstance;

    var erisdb = erisDbFactory.createInstance(nodes[0]);
    erisdb.start(function(error){
        if(!error){
            console.log("Ready to go");
        }
    });

    var pipe = new erisContracts.pipes.DevPipe(erisdb, accounts); /* Create a new pipe*/
    var contractManager = erisContracts.newContractManager(pipe); /*Create a new contract object using the pipe */
    var contractSource = "contract PassportIndex {mapping (address => string) public passports;function register(address owner, string passport) {passports[owner] = passport;}}"
    var compiledContract = solc.compile(contractSource);
    var contractFactory = contractManager.newContractFactory(JSON.parse(compiledContract.contracts.PassportIndex.interface))
    
   contractFactory.new.apply(contractFactory, [
	 {from: account, data:compiledContract.contracts.PassportIndex.bytecode}, function(err, createdContractInstance) {
	  if(err) {console.log(err)}
	  console.log("Contract created! "+ createdContractInstance.address);
	  contractInstance = createdContractInstance;
	 }]);
	 

    return {

        getPassportIndexContract : function getPassportIndexContract() {
            return contractInstance;
        }
    }
})();

