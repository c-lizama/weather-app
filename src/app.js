let now = new Date();

let h2 = document.querySelector("h2");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

h2.innerHTML = ` ${day}, ${month} ${date} ${year} ${hours}:${minutes} `;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class= "row" >`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `    
         <div class="col-sm">
          
            <span class="weather-day"> ${formatDay(forecastDay.dt)} </span>
            <br />
            <span class="weather-icon">
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="72"
              />
            </span>
            <br />
            <span class="weather-temp"> ${Math.round(
              forecastDay.temp.max
            )}°C </span>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let apiKey = "b20edc16a863f8a69dbcafcfb6c32b14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

search("New York");

function searchCity(event) {
  event.preventDefault();
  let apiKey = "b20edc16a863f8a69dbcafcfb6c32b14";
  let searchInput = document.querySelector("#search-city-input");
  let city = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let button = document.querySelector("#search-button");
button.addEventListener("click", searchCity);

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b20edc16a863f8a69dbcafcfb6c32b14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let locateButton = document.querySelector("#locate-button");
locateButton.addEventListener("click", showCurrentPosition);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b20edc16a863f8a69dbcafcfb6c32b14";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let place = response.data.sys.country;
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `${temperature}`;
  let location = document.querySelector("#current-city");
  location.innerHTML = `${city}, ${place}`;

  let todaycondition = document.querySelector("#current-temp-description");
  todaycondition.innerHTML = `${condition}`;
  let todayhumidity = document.querySelector("#current-temp-humidity");
  todayhumidity.innerHTML = `Humidity: ${humidity}%`;
  let todaywind = document.querySelector("#current-temp-windspeed");
  todaywind.innerHTML = `Wind: ${wind}km/h`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
