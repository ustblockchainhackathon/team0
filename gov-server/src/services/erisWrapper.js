'use strict';

var erisContracts = require('eris-contracts'),
      solc = require('solc'),
      accounts = require("./accounts.js").accounts,
      nodes = require("./ips.js").ips,
      account = accounts[0].address,
      erisDbFactory = require('eris-db'),
      abi = [{"constant":false,"inputs":[{"name":"owner","type":"address"},{"name":"passport","type":"string"}],"name":"register","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"passports","outputs":[{"name":"","type":"string"}],"type":"function"}],
      bytecode = "60606040526102b6806100126000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806332434a2e14610044578063e37c132b146100a357610042565b005b6100a16004808035906020019091908035906020019082018035906020019191908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050909091905050610127565b005b6100b96004808035906020019091905050610203565b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156101195780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b80600060005060008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000509080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101a057805160ff19168380011785556101d1565b828001600101855582156101d1579182015b828111156101d05782518260005055916020019190600101906101b2565b5b5090506101fc91906101de565b808211156101f857600081815060009055506001016101de565b5090565b50505b5050565b60006000506020528060005260406000206000915090508054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102ae5780601f10610283576101008083540402835291602001916102ae565b820191906000526020600020905b81548152906001019060200180831161029157829003601f168201915b50505050508156"
 

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
    var contractFactory = contractManager.newContractFactory(abi)
    
   contractFactory.new.apply(contractFactory, [
	 {from: account, data:bytecode}, function(err, createdContractInstance) {
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

