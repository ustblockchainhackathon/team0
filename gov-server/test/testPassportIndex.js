/*eslint-env node, mocha*/
'use strict';

var chai = require('chai'),
	  expect = chai.expect,
	  passportIndex = require('../src/services/passportIndex.js');
	  
describe("Passport Index", function () {
    it(" - should work!!!", function (done) {
    	this.timeout(10000)
    	
    	var owner = "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe"
    	var name ="ble"
    	var surname = "bla"
    	var dob = "bli"
    	var ssn = "blo"
    	var imageId = "daddaad"
    	var imageHash = "dafjksfjdghdjl"
    	
    	passportIndex.register(owner, name, surname, dob,ssn, imageId, imageHash).then(function retrievePassport(result) {
    		console.log(result);
    		return passportIndex.getPassport(owner);
    	}).then(function validatePassport(passport) {
    		expect(passport.name).to.equal(name);
    		expect(passport.owner).to.equal(owner);
    		expect(passport.surname).to.equal(surname);
    		expect(passport.dob).to.equal(dob);
    		expect(passport.ssn).to.equal(ssn);
    		expect(passport.imageId).to.equal(imageId);
    		expect(passport.imageHash).to.equal(imageHash);
    		done();
    	}).fail(function onFailure(error) {
    		console.log(error + "\n" + error.stack)
    	});
    });
});
