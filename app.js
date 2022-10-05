const express = require('express');
const https = require("https");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html")

})

app.post("/", (req,res) => {
   const queryCity = req.body.cityName;

   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity +"&units=metric&appid=349590a6161ecc9e7689214434a7071e"

    https.get(url, (response)=>{
        console.log(response.statusCode)

        response.on("data", (data)=>{

           const result =  JSON.parse(data)
           const temp = result.main.temp
            const desc = result.weather[0].description
            const icon  = result.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<p>The weather description in " + queryCity + " is " + desc + " </p>")
            res.write("<h1>The weather temperature in "+  queryCity + " is " + temp + " degrees "+" </h1>")
            res.write("<img src=" + imageURL +">")
            res.send()
            
            
        } )
    })


})


    

app.listen('3000', () => {
    console.log("serving at port 3000")

})