const express = require('express'),
      bodyParser = require('body-parser'),
      path = require('path'),
      registerRoute = require('./src/routes/register.js'),
      authenticateRoute = require('./src/routes/authenticate.js'),
      signatureRoute = require('./src/routes/signature.js'),
      cfenv = require('cfenv');
      app = express();
      
app.use(bodyParser.json());
app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET, POST');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   next();
});


app.use('/register', registerRoute);
app.use('/authenticate', authenticateRoute);
app.use('/signature', signatureRoute);

var appEnv = cfenv.getAppEnv();

app.listen(appEnv.port, function() {
  console.log('Listening on port 3000...')
})

module.exports = app; //for testing