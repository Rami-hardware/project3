const btn = document.getElementById("btn");
let url = 'http://api.weatherbit.io/v2.0/current?&city='
let key = "&key=281c1329251646259135d1167bcf655e"
// getting conrty names from Geo API
const weather = async (city) => {
    const res = await fetch(`${url}${city}${key}`)
    try{
        const data = await res.json();
      
        return data;
    } catch (err){
        console.log('err' + err);
    }
}
// posting data to server
const postData = async (url = '' , data = {} ) =>{
    
    const res = await fetch(url , {
        method: 'POST',
        credentials:'same-origin',
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            temp:data.temp,
            feelTemp:data.feelTemp,
            description:data.description
        })
    });
    try{
        const newData = await res.json();
        return newData;
    } catch (err){
        console.log(err);
    }
}
//
const getWeather = () =>{
    btn.addEventListener('click' , () =>{
        const county = document.getElementById("county").value;
        weather(county)
        .then((data) =>{
            postData("/saveData" , {
                temp: data.data[0].temp,
                feelTemp: data.data[0].app_temp,
                description:data.data[0].weather.description
            })
        })
        .then(()=>{
            update();
        })
    })
}
const update = async () => {
    const req = await fetch('/showData');
    try {
        const getData = await req.json();
        // update new entry values
        if (getData.temp !== undefined  && getData.temp !== undefined && getData.description !==undefined) {
            document.getElementById('temp').innerHTML = getData.temp;
            document.getElementById("feelTemp").innerHTML = getData.feelTemp;
            document.getElementById("description").innerHTML = getData.description;
        }
    } catch (err) {
        console.log('error', err);
    }
};

export {getWeather}