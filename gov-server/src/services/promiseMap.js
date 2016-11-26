'use strict'

module.exports = (function init() {

	var promiseMap = {};
	
	return {
		registerPromise:  function registerPromise(promiseId,promise,timeout) {
			promiseMap[promiseId] = promise;
			setTimeout(function timeoutPromise(){
				var promiseFromMap = promiseMap[promiseId];
				if(promiseFromMap) {
					promiseFromMap.reject(new Error("Promise timed out!"));
					promiseMap[promiseId] = undefined;
				}
			}, timeout);
		},
		resolvePromise : function resolvePromise(promiseId,param) {
			var promiseFromMap = promiseMap[promiseId];
			if(promiseFromMap) {
				promiseFromMap.resolve(param);
				promiseMap[promiseId] = undefined;
			} else {
				throw new Error("No promise registered under that id or already timed out!")
			}
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