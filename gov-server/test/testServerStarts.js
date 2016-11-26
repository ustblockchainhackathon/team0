/*eslint-env node, mocha*/
'use strict';

var chai = require('chai'),
	  expect = chai.expect,
	  server = require('../app.js');
	  
describe("Server", function () {
    it(" - should work!!!", function (done) {
    	this.timeout(10000);
    	setTimeout(function(){done()},9000)
    });
});
