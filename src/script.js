function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
let iconElement = document.querySelector("#icon");


icon.innerHTML = `<img src = "${response.data.condition.icon_url}" class="icon" />`;

  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  timeElement.innerHTML = formatDate(date);

  function formatDate (date) {
   
  
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
  }

  temperatureElement.innerHTML = Math.round(temperature);
 

  getForecast(response.data.city);
}




function searchCity(city) {
  let apiKey = "23a97cd4bfcbff879400f60t20ao904e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);

  searchCity(searchInput.value);

  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);

   

  
}
searchCity("Jacksonville");








function getForecast(city) {
  let apiKey = "23a97cd4bfcbff879400f60t20ao904e";
  let apiUrl =
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;


    axios.get(apiUrl).then(displayForecast);
  
}


  function displayForecast(response) {
console.log(response.data);



  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
let forecastHtml = "";


days.forEach(function(day) {
   forecastHtml += `
   <div class="weather-forecast-date">
            ${day}
            </div>
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" width="40px" alt="">
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-high">18° </span> 
            <span class="weather-forecast-low">12° </span>

          </div>  
        </div>
`;
  

});
  let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;

  }


  displayForecast();
