/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * DONEj: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

function fahrenheitToCelsius(fahrenheit) {
    var celsius = (fahrenheit - 32) * 5 / 9;
  return celsius.toFixed(1);
}

getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`
  let weatherPromise = fetch(FULL_URL)
  return weatherPromise.then((response) => {
    return response.json()
  })
}

searchCity = () => {
  const city = document.getElementById('city-input').value;
  let searchButton = document.getElementById('search-button')
  let spinner = document.getElementById("loading-spinner");
  spinner.style.display = "block";

    searchButton.addEventListener('click', function() {
      getWeatherData(city)
      .then((response) => {
        console.log(response)
        showWeatherData(response)
        
        // console.log(weatherIcon)
        spinner.style.display = "none";
      }).catch((error) => {
        console.log('There was an error: ', error) 
        showSearchError() 
        spinner.style.display = "none";
      })
    })
    
}


showWeatherData = (weatherData) => {
  console.log("Hello")
  document.getElementById('city-name').innerText = weatherData.name
  document.getElementById('weather-type').innerText = weatherData.weather[0].main
  document.getElementById('temp').innerText = fahrenheitToCelsius(weatherData.main.temp)
  document.getElementById('min-temp').innerText = fahrenheitToCelsius(weatherData.main.temp_min)
  document.getElementById('max-temp').innerText = fahrenheitToCelsius(weatherData.main.temp_max)
  document.getElementById('weather-icon').style.display = 'block'
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
  const weatherIcon = document.getElementById("weather-icon")
  weatherIcon.setAttribute("src", weatherIconUrl)
}

showSearchError = () => {
  document.getElementById('error-title').style.display = 'block';
  document.getElementById("error-message").style.display = "block";
  document.getElementById('weather-type').style.display = "none";
  document.getElementById('city-name').style.display= "none";
  document.getElementById('weather-details').style.display= "none";
}
