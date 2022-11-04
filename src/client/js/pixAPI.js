const btn = document.getElementById("btn");
let url = 'https://pixabay.com/api/?key=31050646-246a5ea483a607f1c31c7ef4b&q='
// getting conrty names from Geo API
const img = async (img) => {
    const res = await fetch(`${url}${img}`)
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
            counterImg:data.preURL,
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
const getImg = () =>{
    btn.addEventListener('click' , () =>{
        const county = document.getElementById("county").value;
        img(county)
        .then((data) =>{
            postData("/saveData" , {
                preURL: data.hits[0].webformatURL
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
        if (getData.counterImg !== undefined ) {
            document.getElementById("img").src = getData.counterImg
        }
    } catch (err) {
        console.log('error', err);
    }
};

export { getImg }