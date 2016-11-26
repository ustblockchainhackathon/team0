'use strict';

var express = require('express'),
      Q = require('q'),
      router = express.Router();

router.post('/', function (req, res, next) {
	
	var requestId = req.body.requestId;
	console.log(requestId + ' Received signature submission request, signature:' + req.body.signature);
	var signature = req.body.signature
	
	Q.fcall(function submitSignature() {
		var deffered = Q.defer();
		signaturePromiseMap.registerPromise('M' + requestId, deffered, 10000);
		signaturePromiseMap.resolvePromise('C' + requestId, signature);
		return deferred
	}).then(function onSuccess() {
		console.log(requestId + ' Signature submission concluded succesfully!');
		res.sendStatus(200);
	}).fail(function onFailure(error) {
		errorHandler.handleError(res,error,requestId,403);
	});
});


module.exports = router;