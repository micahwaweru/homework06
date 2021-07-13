console.log('Script attached');
var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'Chicago';
var units = '&units=imperial';
var APIKey = '&appid=e1a4a8808d7f6de7333f8ac6e7ef2b5d';

var apiUrl= baseUrl + city + units + APIKey;
console.log(apiUrl);

var getWeather = function(){
    fetch(apiUrl)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          var temperature = data.main.temp;
          var humidity = data.main.humidity;
          var wind = data.wind.speed;
          console.log('Temp: ' + data.main.temp);
          console.log('Humidity: ' + data.main.humidity + '%')
          console.log('Wind: ' + wind + 'MPH');
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

}

getWeather();