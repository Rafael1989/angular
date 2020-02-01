const express = require('express');
const app = express();

app.arguments(express.static(__dirname + '/dist'));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(proccess.env.PORT || 4200);
