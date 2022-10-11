/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather"
const AKey = "b055ae46ba07e34420249eab66da4ed5"
const btn = document.getElementById('generate');
const zip = document.getElementById('zip').value;
const content = document.getElementById('feelings').value;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
//addEventListener
btn.addEventListener("click", ev = () => {
    // call the function 
    getWeatherData(baseURL, zip, AKey)
        .then(function (data) {
            // add data to POST request
            postData('/postData', { temp: data.main.temp, date: newDate, content: content });
        }).then(function () {
            // call updateUI to update browser content
            updateUI()
        }).catch(function (error) {
            console.log(error);
            console.log("erorr")
        });
 })
 /* Function to GET Web API Data*/
 const getWeatherData = async(baseURL, zip, AKey) => {
    // res equals to the result of fetch function
    const res = await fetch(`${baseURL}?q=${zip}&appid=${AKey}`);
    try {
        // data equals to the result of fetch function
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error');
    }
};
/* Function to POST data */
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
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
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error");
    }
};

const updateUI = async() => {
    const request = await fetch('/getData');
    try {
        const data = await request.json();
        console.log(data);
        // update new entry values
        if (data.date !== undefined && data.temp !== undefined && data.content !== undefined) {
            document.getElementById('date').innerHTML = data.date;
            document.getElementById('temp').innerHTML = data.temp;
            document.getElementById('content').innerHTML = data.content;
        }
    } catch (error) {
        console.log('error', error);
    }
};