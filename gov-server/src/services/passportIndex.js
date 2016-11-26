'use strict';

var erisC = require('eris-contracts'),
      Q = require('q'),
      contractsManagerWrapper = require('./contractsManagerWrapper.js'),
      passportIndexAbi = require('../../config/passportIndexAbi.json');

module.exports = PassportIndex;

function PassportIndex(passportIndexAddress) {

    var contractsManager = contractsManagerWrapper.getContractsManager();
    var passportIndexContract = contractsManager.newContractFactory(passportIndexAbi).at(passportIndexAddress);

    return {

        register : function register(owner, name, surname, dob,ssn, imageId, imageHash) {
			var deferred = Q.defer();
            passportIndexContract.register(owner, name, surname, dob,ssn, imageId, imageHash, function(error, result){
                if(error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(result);
                }
            });
            return deferred.promise;;
        },

         getPassport : function getPassport(owner) {
             
         }
    }
}

