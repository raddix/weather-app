const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '9cdecb76dc237b64532ff47f0f6f2828';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.render('index', {error: null, result : null, tempreature : null, humidity : null, pressure : null, description : null});
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    request(url, function (err, response, body)  {

        if(err)
        {
            res.render('index',{error: 'error', result : null, tempreature : null, humidity : null, pressure : null, description : null});
        }
        else
        {
            let weather = JSON.parse(body);

            if(weather.main == undefined)
            {
                res.render('index',{error: 'error', result : null, tempreature : null, humidity : null, pressure : null, description : null});
            }
            else
            {
                let temp = `${weather.main.temp} degrees in ${weather.name}!`;
                let humid = `${weather.main.humidity}`;
                let press = `${weather.main.pressure}`;
                let desc = `${weather.weather[0].description}`;
                res.render('index', {error: null, result : 'result', tempreature : temp, humidity : humid, pressure : press, description : desc});
            }
        }

    });
})
  
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})