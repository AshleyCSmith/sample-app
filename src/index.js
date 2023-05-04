let apiKey = "0d9e11bac4471651b0dc2b1ef88a7548";

let searchInput = document.querySelector("#search-input");
let temperatureElement = document.querySelector("#temperature");
let description = document.querySelector("#temp-description");
let cityChange = document.querySelector("#city-change");
let humidityElement = document.querySelector("#humidity");
let windSpeedElement = document.querySelector("#wind-speed");
let iconElement = document.querySelector("#weather-icon");

function formatDay(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.toLocaleString("en-US", {
    weekday: "short",
  });
  return day;
}

function showForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (dailyForecastDay, index) {
    if (index < 7) {
      forecastHTML += `
   <div class="col-2">
     <div class="weather-forecast-date">${formatDay(dailyForecastDay.dt)}</div>
     <img src="http://openweathermap.org/img/wn/${
       dailyForecastDay.weather[0].icon
     }@2x.png" alt="" width="42" />
     <div class="weather-forecast-temperature">
       <span class="weather-forecast-temperature-max">${Math.round(
         dailyForecastDay.temp.max
       )}&deg;</span>
       <span class="weather-forecast-temperature-min">${Math.round(
         dailyForecastDay.temp.min
       )}&deg;</span>
     </div>
   </div>
`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

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
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let cityName = searchInput.value.trim();
  if (!cityName) return;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationWeather);

getCurrentLocationWeather();
