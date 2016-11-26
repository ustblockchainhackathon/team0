'use strict';

var express = require('express'),
      Q = require('q'),
      uuid = require('node-uuid'),
      mobileDB = require('../services/mobileDB.js'),
      errorHandler = require('./errorHandler.js'),
      challengeSevice = require('../services/challengeService.js'),
      UserAuthenticationRequest = require('../model/userAuthenticationRequest.js'),
      passportIndex = require('../services/passportIndex.js');

var router = express.Router();

router.post('/', function (req, res, next) {
	
	var requestId = uuid.v4();
    
	console.log(requestId + ' Received user authentication request:' + JSON.stringify(req.body));
	
	var request = UserAuthenticationRequest(req.body.ethereumAddress, requestId, req.body.personalDetails.name, req.body.personalDetails.surrname);

	Q.fcall(function retrieveMobileMapping() {
        var authenticationToken = mobileDB.getRegistrationToken(req.body.ethereumAddress)
		request.setRegistrationToken(authenticationToken);
    }).then(function initiateChallenge() {
    	 challengeSevice.challengeMobile(request);
    	 var defer = Q.defer();
	    setTimeout(function() {
	    	defer.resolve();
	    },10000)
	    return defer.promise;
	}).then(function onSuccess() {
		return passportIndex.getPassport(req.body.ethereumAddress)
	}).then(function sendResponse(passport) {
		res.send(200,passport)
	}).fail(function onFailure(error) {
	    errorHandler.handleError(res,error,requestId,403);
	});
});

module.exports = router;