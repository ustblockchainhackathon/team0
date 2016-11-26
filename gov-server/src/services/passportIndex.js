'use strict';

var erisWrapper = require('./erisWrapper.js'),
    Q = require('q'),
    accounts = require("./accounts.js").accounts,
    account = accounts[0].address;

module.exports = (function initialize() {
	
    return {

        register : function register(owner, name, surname, dob,ssn, imageId, imageHash) {
        	
        	var passportIndexContract = erisWrapper.getPassportIndexContract();
        	var deferred = Q.defer();
        	var passport = owner+"&"+name+"&"+surname+"&"+dob+"&"+ssn+"&"+imageId+"&"+imageHash
        	
        	passportIndexContract.register.apply(passportIndexContract, [ passport, {from: account}, function(error, data){
        		if(error) {
        			deferred.reject(error);
        		} else {
        			deferred.resolve(data);
        		}
        	}]);
            return deferred.promise;
        },
        
        getPassport : function getPassport(owner) {
        	var deferred = Q.defer();
        	var passportIndexContract = erisWrapper.getPassportIndexContract();
        	passportIndexContract.passports(owner,[function(error, data){
        		
        		if(error) {
        			deferred.reject(error);
        		} else {
        			console.log("retrievedPassport"+data);
        			var splitted = data.split("&");
        			var passport = {
        				owner : splitted[0],
        				name : splitted[1],
        				surname : splitted[2],
						dob : splitted[3],
						imageId : splitted[4],
						imageHash : splitted[5]
        			}
        			deferred.resolve(passport);
        		}
        	}]);
        	return deferred.promise;
        }
    }
})();