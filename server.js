const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const portnum = 3000;
const apikey = '3e2d927d4f28b456c6bc662f34350957'
//Tell the server to read incoming data as JSON
app.use(express.json());

app.get('/',function(req,res){
    //__dirname : Will resolve to your project folder.
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(process.env.port || portnum);
console.log('Listening on port', portnum);

//Set up route from Client to Server
app.post('/weather', (req, res) => {
  let city = req.body.message
  let url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid='+apikey
  request(url, function(err, response, body){
    if (err) res.json({status: 'Error, please try again'})
    else {
      let data = JSON.parse(body)
      console.log(data)
      if (data.message === 'city not found'){
        res.json({
          status: 'Undefined',
          weather: null
        })
      }
      else {
        let weatherval = data.weather[0]['description']
        let countryval = data.sys.country
        var rainval = null
        if (data.weather[0]['main'] == 'Rain'){
          rainval = data.weather[0]['main']
        }
        let tempval = data.main.temp
        let windval = data.wind.speed
        var avgrainfallval = null
        if (data.rain = 'undefined') avgrainfallval = null
        else if (data.rain['3h']) avgrainfallval = data.rain['3h']
        else if (data.rain['5h']) avgrainfallval = data.rain['5h']
        res.json({
          status: 'Success',
          weather: weatherval,
          country: countryval,
          rain: rainval,
          temp: tempval,
          wind: windval,
          avgrainfall : avgrainfallval
        })
      }
    }
  })
 
});