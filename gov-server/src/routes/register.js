'use strict';

var express = require('express'),
      Q = require('q'),
      uuid = require('node-uuid'),
      errorHandler = require('./errorHandler.js'),
      challengeSevice = require('../services/challengeService.js'),
      MobileRegistrationRequest = require('../model/mobileRegistrationRequest.js'),
      UserAuthenticationRequest = require('../model/userAuthenticationRequest.js'),
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
	}).then(function sendChallange() {
		return challengeSevice.challengeMobile(request)
	}).then(function onSuccess() {
		log.info(requestId + ' mobile registration request was submitted succesfully');
		mobileDB.saveMobileMapping(ethereumAddress,registrationToken);
	}).fail(function onFailure(error) {
		errorHandler.handleError(res,error,requestId,403);
	});
});

router.post('/user', function (req, res, next) {
	var requestId = uuid.v4();
    var ethereumAddress = req.body.ethereumAddress;
    var personalDetails = req.body.personalDetails;
	console.log(requestId + ' Received user registration request:' + ethereumAddress  + " " + JSON.stringify(personalDetails));
    
    var request = UserAuthenticationRequest(ethereumAddress, requestId, personalDetails.name, personalDetails.surname,
    	personalDetails.dob, personalDetails.ssn)
    
	Q.fcall(function retrieveMobileMapping() {
		var authenticationToken = mobileDB.getRegistrationToken(ethereumAddress)
		request.setRegistrationToken(authenticationToken);
	}).then(function sendChallenge() {
	    return challengeSevice.challengeMobile(request)
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