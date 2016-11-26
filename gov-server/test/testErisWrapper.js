/*eslint-env node, mocha*/
'use strict';

var chai = require('chai'),
	  expect = chai.expect,
	  erisWrapper = require('../src/services/erisWrapper.js');
	  
describe("Eris Wrapper", function () {
    it(" - should properly upload passportIndex contract", function (done) {
    	this.timeout(10000)
		setTimeout(function() {
			expect(erisWrapper.getPassportIndexContract()).to.not.be.undefined
			done();
		},5000)
    });
});
