/* Global Variables */
const url = "https://api.openweathermap.org/data/2.5/weather?q="
const apiKey = "&appid=d66de177651c594dc10ea6258176c6a6";
const generateBtn = document.getElementById('generate');
// Create a new date instance dynamically with JS
let today = new Date();
let tDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
/* GET Web API Data*/
const weatherData = async (url, zip, apiKey) => {
    // res equals to the result of fetch function
    const res = await fetch(`${url}${zip}${apiKey}`);
    try {
        // data equals to the result of fetch function
        const data = await res.json();
        return data;
    } catch (err) {
        console.log('error', err);
    }
};
/*POST data */
const sendData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const nData = await res.json();
        return nData;
    } catch (error) {
        console.log(error);
    }
};
//get data and send it to server to handle it
generateBtn.addEventListener('click', function () {
    //get user input
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    weatherData(url, zip, apiKey)
        .then(function (data) {
            // add data to POST request
            sendData('/saveData', { temp: data.main.temp, date: tDate, content: content });
        }).then(function () {
            // call update() to update browser content
            update()
        }).catch(function (err) {
            console.log(err);
        });
});
// updating the ui with the data saved in server
const update = async () => {
    const req = await fetch('/showData');
    try {
        const getData = await req.json();
        console.log(getData);
        // update new entry values
        if (getData.date !== undefined && getData.temp !== undefined && getData.content !== undefined) {
            document.getElementById('date').innerHTML = getData.date;
            document.getElementById('temp').innerHTML = getData.temp + 'F';
            document.getElementById('content').innerHTML = getData.content;
        }
    } catch (err) {
        console.log('error', err);
    }
};