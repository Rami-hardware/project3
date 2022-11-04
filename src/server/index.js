var path = require('path')
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
let projectData = {};
app.use(cors());
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})
app.post('/saveData', (req, res) => {
    projectData['name'] = req.body.name;
    projectData['CountryName'] = req.body.CountryName;
    projectData['temp'] = req.body.temp;
    projectData['feelTemp'] = req.body.feelTemp;
    projectData['description'] = req.body.description
    projectData['counterImg'] = req.body.counterImg
    res.send(projectData);
  });
  app.get('/showData', (req, res) =>{
    res.send(projectData);
  });
// designates what port the app will listen to for incoming requests
app.listen(5051, function () {
    console.log('Example app listening on port 5051!')
})