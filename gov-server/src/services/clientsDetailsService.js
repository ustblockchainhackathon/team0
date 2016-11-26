'use strict';

const geoIp2 = require('geoip2'),
	  publicIp = require('public-ip'),
      LOCAL_IP_REGEX = /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/,
      DEFAULT_CITY = "London";

var serversIp;

geoIp2.init();

publicIp.v4().then(function(ip){
    serversIp = ip;
    console.log("Server's external ip is:" + serversIp);
});

module.exports = (function init(){
    return{
        getDetailsFromClient : function getDetailsFromClient(ip, userAgent){
            var clientsDetailsToReturn = {};
            var clientIpTrimmed = ip == "::1" ? "localhost" : ip.split(":")[3];//obtains 'clear' host
            var city;
            if (clientIpTrimmed == "localhost" || LOCAL_IP_REGEX.test(clientIpTrimmed)){//if it is local ip
                city = serversIp ? geoIp2.lookupSimpleSync(serversIp).city : DEFAULT_CITY;//gets location of server's ip
            }
            else {
                city = geoIp2.lookupSimpleSync(clientIpTrimmed).city;//gets location
            }
            clientsDetailsToReturn["city"] = city;
            clientsDetailsToReturn["ip"] = clientIpTrimmed;
            clientsDetailsToReturn["osAndWebBrowser"] = userAgent;
            return clientsDetailsToReturn;
        }
    }
})();