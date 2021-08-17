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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let place = response.data.sys.country;
  let condition = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);

  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `${temperature}˚C`;
  let location = document.querySelector("#current-city");
  location.innerHTML = `${city}, ${place}`;

  let todaycondition = document.querySelector("#current-temp-description");
  todaycondition.innerHTML = `${condition}`;
  let todayhumidity = document.querySelector("#current-temp-humidity");
  todayhumidity.innerHTML = `Humidity: ${humidity}%`;
  let todaywind = document.querySelector("#current-temp-windspeed");
  todaywind.innerHTML = `Wind: ${wind}km/h`;

  function changeToFahrenheit(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temp");
    let temperature = Math.round(response.data.main.temp);
    temperature = Number(temperature);
    currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
  }

  function changeToCelsius(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("#current-temp");
    let temperature = Math.round(response.data.main.temp);
    temperature = Number(temperature);
    currentTemperature.innerHTML = Math.round(response.data.main.temp);
  }

  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.addEventListener("click", changeToFahrenheit);
  let celsius = document.querySelector("#celsius-link");
  celsius.addEventListener("click", changeToCelsius);

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
