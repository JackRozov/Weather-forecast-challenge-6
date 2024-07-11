const API = `a1d90eb1b487faeb0b94aa3e66ed15e0`;
const searchinput = document.getElementById(`searchinput`);
const searchButton = document.getElementById(`searchButton`);
const storedcities = JSON.parse(localStorage.getItem(`cities`)) || [];
const container = document.getElementById(`container`);
const btncontainer = document.getElementById('buttons');

function getdata(){
    let city = searchinput.value.trim();
    const apiurl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;
    
    fetch(apiurl)
   
    .then(function (response) {
         return response.json();
    })
    
    .then(function (data) {
         renderCurrentWeather(city,data);
         storesearchHistory(city);
    })
    
    .catch(function (error) {
         console.error(error);
})
}
function renderCurrentWeather(city,weather) {
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity;
    const icon = weather.list[0].weather[0].icon;
    const iconURL =`https://openweathermap.org/img/wn/${icon}.png`;
    const windh1 = document.createElement(`h1`);
    const humidh1 = document.createElement(`h1`);
    const iconimg = document.createElement(`img`);
    const temph1 = document.createElement(`h1`);
    temph1.textContent= temp;
    windh1.textContent= wind;
    iconimg.setAttribute("src",iconURL);
    humidh1.textContent= humid;
    container.append(iconimg,temph1,windh1,humidh1);

}
function storesearchHistory(city) {
    storedcities.push(city);
    localStorage.setItem(`cities`,JSON.stringify(storedcities));
}
function createHistoryButton() {
    const thisstoredcity = JSON.parse(localStorage.getItem(`cities`))

    for (let i = 0; i < thisstoredcity.length; i++) {
        const newbutton =   document.createElement(`button`);
        newbutton.classList.add(`historybtn`)
        newbutton.textContent = thisstoredcity;
        btncontainer.append(newbutton);
    };
    

}

function handlesearchhistory(e) {
    if(!e.target.matches(`.historybtn`)){
        return; 
    }
    const target = e.target;
    const cityname = target.texetcontent;
    renderCurrentWeather(cityname);
}



createHistoryButton();
btncontainer.addEventListener(`click`, handlesearchhistory);

searchButton.addEventListener(`click`,getdata);