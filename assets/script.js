console.log('Script attached');

var submitButton = document.querySelector('#submitButton');
var searchTerm = document.querySelector('#searchTerm');
var todayWeatherList = document.querySelector('#todayWeatherList');
var heroHead = document.querySelector('#heroHead');
var dateSub = document.querySelector('#dateSub');

var searchButtonHandler = function(event){
    event.preventDefault();
    console.log('Button clicked!');
    var now = moment();
    console.log(now.format('L'))
    dateSub.textContent = now.format('L');

    if(searchTerm.value){
        console.log(searchTerm.value);
        getWeather(searchTerm.value);
        heroHead.textContent = searchTerm.value;
    }
    else{
        console.log('Please enter search term')
    }
}

submitButton.addEventListener('click', searchButtonHandler);


var getWeather = function(city){
  var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
  //var city = 'Chicago';
  var units = '&units=imperial';
  var daily = '&daily.temp.day'
  var APIKey = '&appid=e1a4a8808d7f6de7333f8ac6e7ef2b5d';
  var apiUrl= baseUrl + city + units + daily + APIKey;
  console.log(apiUrl);

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

          var tempItem = document.createElement('li');
			    var humidityItem = document.createElement('li');
			    var windItem = document.createElement('li');

			    tempItem.textContent = 'Temp: ' + temperature;
			    humidityItem.textContent = 'Humidity: ' + humidity;
			    windItem.textContent  = 'Wind: ' + wind + 'MPH';

          todayWeatherList.appendChild(tempItem);
          todayWeatherList.appendChild(humidityItem);
          todayWeatherList.appendChild(windItem);


        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

}

//getWeather();