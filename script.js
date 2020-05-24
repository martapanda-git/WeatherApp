//ZMIENNE
console.log('hello')
const weatherBgc = document.querySelector('.weather-img');
const weatherTemp = document.querySelector('.weather-temp h1');
const weatherDesc = document.querySelector('.weather-description h2');
const weatherLocation = document.querySelector('.weather-location h2');
const notificationElement = document.querySelector('.notification');
const menuBtn = document.querySelector('.burger');
const menuFaBars = document.querySelector('.fa-bars');
const menuFaTimes = document.querySelector('.fa-times');
const mobileMenu = document.querySelector('.mobile-menu-navbar');


// APP DATA
const weather = {};
weather.temperature = {
    unit: "celsius"
};
const KELVIN = 273;

console.log('hello2')

//API KEY
const key = "08edc673305f9947c8f51b44cf310be8";

// CHECK IF GEOLOCATION IS ON
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);

} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<h2>Bro! You need to turn on the geolocation on your browser!</h2";
}
console.log('hello3')

//USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//SHOW ERROR
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<h2 class="
    errorinfo "> Bro! You need to turn on the geolocation on your browser! </h2>`;
}

//WEATHER from OPENWEATHERMAP
function getWeather(latitude, longitude) {
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
}

//SHOW ME THE WEATHER
function displayWeather() {
    weatherBgc.innerHTML = `
    <div class="weather-img" style="background-image: url(./weather-bg/${weather.iconId}.svg)"></div>`;
    weatherTemp.innerHTML = `<h1>${weather.temperature.value}°<span>C</span></h1>`;
    weatherDesc.innerHTML = weather.description;
    weatherLocation.innerHTML = `${weather.city}, ${weather.country}`;
};

menuBtn.addEventListener("click", function () {
    menuFaBars.classList.toggle("show");
    menuFaTimes.classList.toggle("show");
    mobileMenu.classList.toggle("show");
});