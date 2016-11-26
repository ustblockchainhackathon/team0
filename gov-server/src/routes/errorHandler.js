'use strict';

module.exports = (function initialize() {

	return {
		handleError : function handleError(res,error,requestId,status) {
			console.log(requestId + ' ' + error.toString()+ '\n' + error.stack);
            res.status(status).send({
                requestId : requestId,
                error : error.toString()
            });
		}
	};
})();