'use strict';

const log = require('../util/log.js');

module.exports = (function initialize() {

	return {
		handleError : function handleError(res,error,requestId,status) {
			log.error(requestId + ' ' + error.toString()+ '\n' + error.stack);
            res.status(status).send({
                requestId : requestId,
                error : error.toString()
            });
		}
	};
})();