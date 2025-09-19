function displayTemperature(response) {
  let cityElement = document.querySelector(".current-weather h1");
  cityElement.innerHTML = response.data.city;

  let temperatureElement = document.querySelector(".temperature");
  let temperature = Math.round(response.data.temperature.current);
  temperatureElement.innerHTML = `<span class="icon">☀️</span> ${temperature}º`;

  let detailsElement = document.querySelector(
    ".current-weather p:nth-of-type(2)"
  );
  let humidity = response.data.temperature.humidity;
  let wind = response.data.wind.speed;
  detailsElement.innerHTML = `${formatDateTime(new Date())}, ${
    response.data.condition.description
  } <br /> Humidity: <strong>${humidity}%</strong>, Wind: <strong>${wind} km/h</strong>`;
}

function fetchWeather(city) {
  let apiKey = "tao7baef468f14105432d33cc99439dd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  if (city.length > 0) {
    fetchWeather(city);
  }
  searchInputElement.value = "";
}

function formatDateTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayName = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  return `${dayName} ${hour}:${minutes}`;
}

function updateDateTime() {
  let dateElement = document.querySelector(".current-date");
  dateElement.textContent = formatDateTime(new Date());
}

updateDateTime();
setInterval(updateDateTime, 60000);

let form = document.querySelector("form");
form.addEventListener("submit", search);

fetchWeather("Paris");
