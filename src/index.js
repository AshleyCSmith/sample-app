let apiKey = "0d9e11bac4471651b0dc2b1ef88a7548";

let searchInput = document.querySelector("#search-input");
let temperatureElement = document.querySelector("#temperature");
let description = document.querySelector("#temp-description");
let cityChange = document.querySelector("#city-change");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let iconElement = document.querySelector("#weather-icon");

function showTemperature(response) {
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  cityChange.innerHTML = response.data.name + ", " + response.data.sys.country;
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let iconCode = response.data.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  iconElement.setAttribute("src", iconUrl);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celciusTemperature = response.data.main.temp;
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

function updateTime() {
  let now = new Date();
  let timeString = now.toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  document.getElementById("current-time").textContent =
    "Last updated: " + timeString;
}

setInterval(updateTime, 1000);

function showFahrenheit(event) {
  event.preventDefault();
  changeCelcius.classList.remove("active");
  changeFahrenheit.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelcius(event) {
  event.preventDefault();
  changeCelcius.classList.add("active");
  changeFahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let changeFahrenheit = document.querySelector("#change-fahrenheit");
changeFahrenheit.addEventListener("click", showFahrenheit);

let changeCelcius = document.querySelector("#change-celcius");
changeCelcius.addEventListener("click", showCelcius);

let celciusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

getCurrentLocationWeather();
