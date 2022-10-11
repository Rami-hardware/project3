// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const Cors = require("Cors");
const port = 8080;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(Cors());
// Initialize the main project folder
app.use(express.static('website'));

//Return Endpoint Data GET Route I: Server Side
app.get("/getData" , (req ,res) =>{
    res.send(projectData);
})
//POST Route
app.post("/postData" , (req , res) =>{
  projectData['temp' , "date" , "content"] =   req.body.temp, req.body.date, req.body.content;
  console.log(projectData)
  res.send(projectData);
})
// Setup Server
app.listen(port , run = () =>{
    console.log(`running at ${port}`)
})