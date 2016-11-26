'use strict';

module.exports = function(ethereumAddress, requestId, name, surname, dob, ssn) {
	
	var title = "User registration request",
	body = "Accept if you wish to accept user registration",
	type = 2,
	city = "Madrid",
	ip = "127.0.0.1",
	timestamp = Date.now(),
	
	var registrationToken;
	var secondaryAddress;
	var challenge;
	
	return {
		toPushNotification : function toPushNotification() {
		    var requestInfo = {
                requestId : requestId,
                challenge : challenge,
                type : type,
                ethereumAddress : ethereumAddress,
                secondaryAddress : secondaryAddress,
                city :city,
                ip : ip,
                timestamp : timestamp,
                personalInfo : {
                	name : name,
                	surname : surname,
                	snn : ssn,
                	dob : dob
                }
            }
			return {
				to : registrationToken,
				notification : {
					title : title,
					body : body
				},
				data : {
				    requestInfo : JSON.stringify(requestInfo)
				}
			};
		},
		getEthereumAddress : function getEthereumAddress () {
            return ethereumAddress;
        },
		setRegistrationToken : function setRegistrationToken(_registrationToken) {
			registrationToken = _registrationToken;
		},
		getRegistrationToken : function getRegistrationToken() {
			return registrationToken;
		},
		getRequestId : function getRequestId() {
			return requestId;
		},
		setChallenge : function setChallenge(_challenge) {
			challenge = _challenge;
		}
	};
}