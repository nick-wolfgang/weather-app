/**
 * Weather App
 * DONE: Complete getWeatherData() to return json response Promise
 * DONE: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";


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
    getWeatherData(city)
    .then((response) => {
        console.log(response)
        showWeatherData(response)
    }).catch((error) => {
        console.log('There was an error: ', error)
    })
}


/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
showWeatherData = (weatherData) => {
  //CODE GOES HERE
  document.getElementById('city-name').innerText = weatherData.name
  document.getElementById('weather-type').innerText = weatherData.weather[0].main
  document.getElementById('temp').innerText = weatherData.main.temp
  document.getElementById('min-temp').innerText = weatherData.main.temp_min
  document.getElementById('max-temp').innerText = weatherData.main.temp_max


  
}

