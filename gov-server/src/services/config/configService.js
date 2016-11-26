'use strict';

module.exports = (function initialize() {

    var params = {}

    return {

        setParam : function setParam(key,value) {
        	params[key] = value;
        },
        
        getParam : function getParam(key) {
        	return params[key];
        }
    }
})();