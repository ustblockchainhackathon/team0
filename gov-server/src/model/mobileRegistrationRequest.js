module.exports = function(registrationToken, ethereumAddress,requestId) {

	var title = "Mobile device registration request",
	body = "Accept if you wish to use this device for Ethereum authentication",
	city = "Madrid",
	ip = "127.0.0.1",
	timestamp = Date.now(),
	type = 1;

	var challenge;

	return {
		toPushNotification : function toPushNotification() {
		    var requestInfo = {
                  type : type,
                  ethereumAddress : ethereumAddress,
                  challenge : challenge,
                  timestamp : timestamp,
                  requestId : requestId,
                  city : city,
                  ip : ip,
                  osAndWebBrowser : osAndWebBrowser
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
		getSecondaryAddress : function getEthereumAddress() {
			return ethereumAddress;
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
}