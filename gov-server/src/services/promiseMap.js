'use strict'

module.exports = (function init() {

	var promiseS;
	
	return {
		registerPromise:  function registerPromise(promiseId,promise,timeout) {
			promiseS = promise;
		},
		resolvePromise : function resolvePromise(promiseId,param) {
			promiseS.resolve(param);
		},
		rejectPromise : function rejectPromise(promiseId,error) {
			var promiseFromMap = promiseMap[promiseId];
			if(promiseFromMap) {
				promiseFromMap.reject(error);
				promiseMap[promiseId] = undefined;
			} else {
				throw new Error("No promise registered under that id or already timed out!")
			}
		}
	}
})();