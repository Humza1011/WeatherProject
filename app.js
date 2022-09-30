const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.city;
  const appID = "5787ae50062d4ff98f53b894bd493a2f";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appID +
    "&units=" +
    unit;
  https.get(url, function (respond) {
    respond.on("data", function (data) {
      const weatherData = JSON.parse(data);
      res.write(
        "<p>The weather is currently " +
          weatherData.weather[0].description +
          "</p>"
      );
      res.write(
        "<h1>The temperature in " +
          city +
          " is: " +
          weatherData.main.temp +
          " Celsius.</h1>"
      );
      imgUrl =
        '<img src="http://openweathermap.org/img/wn/' +
        weatherData.weather[0].icon +
        '@2x.png" >';
      res.write(imgUrl);
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Started.");
});