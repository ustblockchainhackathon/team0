'use strict';

module.exports = (function initialize() {

    var db = {}

    return {

        saveMobileMapping : function saveMobileMapping(ethereumAddress,authenticationToken) {
        	db[ethereumAddress] = authenticationToken;
        },
        
        getRegistrationToken : function getRegistrationToken(ethereumAddress) {
        	return params[ethereumAddress];
        }
    }
})();