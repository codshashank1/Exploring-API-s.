
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const https = require("node:https"); // native node module.

// important --->  JSON.parse(data) ----> converts the data to js object format.


app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
   // console.log("Post request succesfully executed.");
   // res.send("Hurray");
   // console.log(req.body.city);
   const apiKey = "d570ab25a0f960c5af5d77226d594ccc";
   const query = req.body.city;
   const units = "metric";
   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid=" + apiKey + "&units=" + units;
   https.get(url, function(response){
      // console.log(response.statusCode);
      response.on("data", function(data){
         // console.log(data);
         const weatherData = JSON.parse(data);
         // console.log(weatherData); //try to uncomment.
         //Use json viewer tool of chrome to get paths effiiciently.
         
         // console.log(weatherData.weather[0].description);
         // console.log(weatherData.sys.sunrise);
         // ---extra---- JSON.stringify(data);
         const temp = weatherData.main.temp;
         const weatherDescription = weatherData.weather[0].description;
         //also can use res.write;
         const iconUrl = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +"@2x.png";
         const imgElement = "<img src=" + iconUrl + ">";
         res.send("<h1>The temperature in celcius at "+ query +" is " + temp + ". </h1>" + 
         "<h3>The weather is " + weatherDescription + "</h3>" + imgElement);
   });
});
// res.send("ALl set !!");

});




app.listen(port, function(){
   console.log("Server started on port 3000");
})
