const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const date = require("./date");
require("dotenv").config();

const app = express();
let dep = [];
let weather = {};
let cur_weather = {};

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  cur_weather = {
    cur_temp: null,
    cur_desc: null,
    cur_icon: null,
    pressure: null,
    humidity: null,
    wind_speed: null
  }
  res.render("index", {dep, cityname:null, cur_weather,});
});

app.post("/", function(req, res) {

  // Response given by external server to our server
  const query = req.body.cityName;       // Getting name of the city using body parser
  const api_key = process.env.API_KEY;
  const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&units=metric&appid=" + api_key;

  https.get(url, function(response) {
    console.log(response.statusCode);

    // Response given by our server to client browser on getting the data
    response.on("data", function(data) {

      const weatherData = JSON.parse(data)
      console.log(weatherData);

      if (weatherData.message === "city not found") {
        cur_weather = {
          cur_temp: null,
          cur_desc: null,
          cur_icon: null,
          pressure: null,
          humidity: null,
          wind_speed: null
        }
        res.render("index", {dep, cur_weather, cityname:weatherData.message});
        } else {

          const cur_day = date.getDate(weatherData.list[1].dt_txt);
          cur_weather = {
            cur_day: cur_day,
            cur_temp: Math.round(weatherData.list[1].main.temp),
            cur_desc: weatherData.list[1].weather[0].description,
            cur_icon: weatherData.list[1].weather[0].icon,
            pressure: weatherData.list[1].main.pressure,
            humidity: weatherData.list[1].main.humidity,
            wind_speed: weatherData.list[1].wind.speed
          }

          for (let i=9; i<weatherData.list.length; i+=8 ) {
            const day = date.getDate(weatherData.list[i].dt_txt);
            weather = {
            day: day,
            temp: Math.round(weatherData.list[i].main.temp),
            description: weatherData.list[i].weather[0].description,
            icon: weatherData.list[i].weather[0].icon
            }
            dep.push(weather);
          }

          res.render("index", {dep, cur_weather, cityname:query});
          dep =[];
        }

        });
    });
});


app.listen(3000, function() {
  console.log("Server running on port 3000");
});

// var temperature;
// var weatherDescription;
// var icon;

// app.get("/", function(req, res) {
//       res.render("weather", {
//         cityname: query,
//         temp : temperature,
//         description : weatherDescription,
//         icon : icon
//       });
// });

// app.post("/", function(req, res) {
//
//   // Response given by external server to our server
//   query = req.body.cityName;       // Getting name of the city using body parser
//   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid=bacd00af45ade1807ab196d276ce9f17";
//
//   https.get(url, function(response) {
//     console.log(response.statusCode);
//
//     // Response given by our server to client browser on getting the data
//     response.on("data", function(data) {
//
//       const weatherData = JSON.parse(data)
//       console.log(weatherData);
//
//       temperature = weatherData.main.temp;
//       weatherDescription = weatherData.weather[0].description;
//       icon = weatherData.weather[0].icon;
//
//       res.redirect("/");
//
//     });
//   });
// });

// weather = {
//   cityname: query,
//   temp : weatherData.main.temp,
//   description : weatherData.weather[0].description,
//   icon : weatherData.weather[0].icon
// }

// <div class="location">
//   <% if(list.weather.[0] !== null)  { %>
//   <h1><%= list.weather.[0] %></h1>
//   <% } %>
//   <% if(list.weather.[2] !== null)  { %>
//   <p><%= list.weather.[2] %></p>
//   <% } %>
// </div>
