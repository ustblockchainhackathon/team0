'use strict';

var express = require('express'),
      Q = require('q'),
      uuid = require('node-uuid'),
      errorHandler = require('./errorHandler.js'),
      challengeSevice = require('../services/challengeService.js'),
      MobileRegistrationRequest = require('../model/mobileRegistrationRequest.js'),
      UserRegistrationRequest = require('../model/userRegistrationRequest.js'),
      mobileDB = require('../services/mobileDB.js'),
      passportIndex = require('../services/passportIndex.js');

var router = express.Router();

router.post('/mobile', function (req, res, next) {
	var requestId = uuid.v4();
    
    var ethereumAddress = req.body.ethereumAddress;
    var registrationToken = req.body.registrationToken;
    console.log("Mobile registration " + ethereumAddress + " token= "+ registrationToken);
    var request = MobileRegistrationRequest(registrationToken,ethereumAddress,requestId)
    Q.fcall(function ackRequest() {
		res.sendStatus(200);
		console.log(requestId + ' mobile registration request was submitted succesfully');
		mobileDB.saveMobileMapping(ethereumAddress,registrationToken);
	}).fail(function onFailure(error) {
		errorHandler.handleError(res,error,requestId,403);
	});
});

router.post('/user', function (req, res, next) {
	var requestId = uuid.v4();
    var ethereumAddress = req.body.ethereumAddress;
    var personalDetails = req.body.personalDetails;
	console.log(requestId + ' Received user registration request:' + ethereumAddress  + " " + personalDetails);
	
    var request = UserRegistrationRequest(ethereumAddress, requestId, personalDetails.name, personalDetails.surname,
    	personalDetails.dob, personalDetails.ssn)
    
	Q.fcall(function retrieveMobileMapping() {
		var authenticationToken = mobileDB.getRegistrationToken(ethereumAddress)
		request.setRegistrationToken(authenticationToken);
	}).then(function sendChallenge() {
	    challengeSevice.challengeMobile(request)
	    var defer = Q.defer();
	    setTimeout(function() {
	    	defer.resolve();
	    },10000)
	    return defer.promise;
	}).then(function registerPassport() {
		console.log(requestId + ' user registration request was submitted succesfully');
		return passportIndex.register(ethereumAddress, ethereumAddress.name, ethereumAddress.surname, ethereumAddress.dob,ethereumAddress.ssn, 
			ethereumAddress.imageId, ethereumAddress.imageHash)
	}).then(function onSuccess(){
		res.sendStatus(200);
	}).fail(function onFailure(error) {
		errorHandler.handleError(res,error,requestId,403);
	});
});

module.exports = router;