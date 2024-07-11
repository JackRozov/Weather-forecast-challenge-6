const API = `a1d90eb1b487faeb0b94aa3e66ed15e0`;
const searchinput = document.getElementById(`searchinput`);
const searchButton = document.getElementById(`searchButton`);

function getdata(){
    let city = searchinput.value.trim();
    const apiurl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;
    
    fetch(API)
   
    .then(function (response) {
         return response.json();
    })
    
    .then(function (data) {
         renderCurrentWeather(city,data);
    })
    
    .catch(function (errpr) {
         console.error(error);
})
}
function renderCurrentWeather(city,weather) {
    const temp = weather.list[0].temp.speed;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].humid.speed;
    const icon = weather.list[0].icon.speed;
    console.log(weather.list[0].main.speed);
}

searchButton.addEventListener(`click`,getdata);