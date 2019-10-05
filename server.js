const express = require('express');
const app = express();
const path = require('path');
const portnum = 3000;

app.get('/',function(req,res){
    //__dirname : Will resolve to your project folder.
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/', function (req, res) {
    console.log(req.body.city);
    res.sendFile(path.join(__dirname+'/index.html'));
  })

app.listen(process.env.port || portnum);
console.log('Listening on port', portnum);

