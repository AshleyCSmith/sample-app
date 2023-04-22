let apiKey = "0d9e11bac4471651b0dc2b1ef88a7548";

let searchInput = document.querySelector("#search-input");
let temperatureElement = document.querySelector("#temperature");
let description = document.querySelector("#temp-description");
let cityChange = document.querySelector("#city-change");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let weatherIcon = document.querySelector("#weather-icon");

function showTemperature(response) {
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  cityChange.innerHTML = response.data.name + ", " + response.data.sys.country;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(event) {
  event.preventDefault();
  let cityName = searchInput.value.trim();
  if (!cityName) return;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
  });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

getCurrentLocationWeather();
