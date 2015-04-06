var express = require('express');

// Create server
var app = express();

// Where to serve static content
app.use(express.static(__dirname + '/dist'));

// Start server on port 3000
var port = 3000;
app.listen(port, function(){
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
