// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
/* Dependencies */
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// GET route
app.get('/showData', (req, res) =>{
  res.send(projectData);
});
// POST route
app.post('/saveData', (req, res) => {
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['content'] = req.body.content;
  res.send(projectData);
});
// Set up and Spin up the server
const port = 8080;
const localhost = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`); // Callback to debug
});