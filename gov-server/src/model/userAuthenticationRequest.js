'use strict';

module.exports = function(ethereumAddress, requestId, officerName, officerSurname) {
	
	var title = "User authentication request",
	body = "Accept if you wish to accept user authentication",
	type = 3,
	city = "Madrid",
	ip = "127.0.0.1",
	timestamp = Date.now();
	
	var registrationToken;
	var challenge;
	
	return {
		toPushNotification : function toPushNotification() {
		    var requestInfo = {
                  type : type,
                  challenge : challenge,
                  ethereumAddress : ethereumAddress,
                  timestamp : timestamp,
                  requestId : requestId,
                  city : city,
                  ip : ip,
                  officerInfo : {
                  	name : officerName,
                  	surname : officerSurname
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
		getEthereumAddress : function getEthereumAddress() {
			return ethereumAddress;
        },
        setRegistrationToken : function setRegistrationToken(_registrationToken) {
			registrationToken = _registrationToken;
		},
		getRegistrationToken : function getRegistrationToken() {
			return registrationToken;
		},
		setChallenge : function setChallenge(_challenge) {
			challenge = _challenge;
		},
		getRequestId : function getRequestId() {
			return requestId;
		}
	};
};