const express = require('express');
const app = express();
const path = require('path');
const portnum = 3000;
//Tell the server to read incoming data as JSON
app.use(express.json());
const apikey = '3e2d927d4f28b456c6bc662f34350957';

app.get('/',function(req,res){
    //__dirname : Will resolve to your project folder.
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.port || portnum);
console.log('Listening on port', portnum);

//Set up route from Client to Server
app.post('/weather', (request, response) => {
  console.log('Request received')
  response.json({
    status: 'Success',
    city: request.body.message
  })
});