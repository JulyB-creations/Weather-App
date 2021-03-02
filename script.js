function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } //(now.getMinutes()<10?'0':'') + now.getMinutes()
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  return `Last updated: ${day}, ${hours}:${minutes}`;
}
let today = document.querySelector("#date");
let now = new Date();

today.innerHTML = formatDate(now);

function displayWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityElement = document.querySelector("h1");
  if (searchInput.value) {
    cityElement.innerHTML = searchInput.value;
  } else {
    cityElement.innerHTML = null;
    cityElement.innerHTML = `Please type a City...`;
  }
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
      <img class="forecast.icon"
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
            />
            <div class="forecast-temp"><strong>${Math.round(
              forecast.main.temp_max
            )}°C</strong> | ${Math.round(forecast.main.temp_min)}°C</div>
          </div>`;
  }
}

function search(city) {
  let apiKey = "d4b17c5b0c006239da987428a9e9effa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

/*function searchLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d4b17c5b0c006239da987428a9e9effa";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);*/

search("Berlin");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temp = temperatureElement.innerHTML;
  temp = Number(temp);
  temperatureElement.innerHTML = Math.round((temp * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let temp = temperatureElement.innerHTML;
  temp = Number(temp);
  temperatureElement.innerHTML = Math.round(((temp - 32) * 5) / 9);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
