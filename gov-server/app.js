const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      requestIp = require('request-ip'),
      registerRoute = require('./src/routes/register.js'),
      authenticateRoute = require('./src/routes/authenticate.js'),
      signatureRoute = require('./src/routes/signature.js'),
      firebaseRoute = require('./src/routes/firebase.js'),
      app = express();
      
app.use(bodyParser.json());
app.use(requestIp.mw());
app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   next();
});


app.use('/register', registerRoute);
app.use('/authenticate', authenticateRoute);
app.use('/signature', signatureRoute);
app.use('/firebase', firebaseRoute);

https.createServer(applicationConfiguration.httpsOptions, app).listen(3000, function () {
    console.log('[HTTPS] Listening on port 3000...');
});

module.exports = app; //for testing