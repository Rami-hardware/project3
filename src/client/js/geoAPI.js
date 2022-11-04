const btn = document.getElementById("btn");
// getting conrty names from Geo API
const Geo = async (country) => {
    const res = await fetch(`http://api.geonames.org/searchJSON?q=${country}&maxRows=10&username=Robin5k`)
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
            name:data.name,
            CountryName:data.CountryName
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
const getCountyName = () =>{
    btn.addEventListener('click' , () =>{
        const county = document.getElementById("county").value;
        Geo(county)
        .then((data) =>{
            postData("/saveData" , {
                name: data.geonames[0].toponymName,
                CountryName: data.geonames[0].countryName
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
        if (getData.name !== undefined ) {
            document.getElementById('name').innerHTML = getData.name;
            document.getElementById("Cname").innerHTML = getData.CountryName;
        }
    } catch (err) {
        console.log('error', err);
    }
};

export {getCountyName}