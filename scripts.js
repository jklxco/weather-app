async function getData(url) {
  try {
    const response = await fetch(url); //, { mode: "cors" });
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    console.log(err);
  }
}

function getWeatherData(url) {
  getData(url)
    .then((data) => {
      return createDataObj(data);
    })
    .then((data) => {
      showWeatherData(data);
    });
}

function createDataObj(data) {
  const weatherData = {
    location: data.name,
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    maxTemp: data.main.temp_max,
    minTemp: data.main.temp_min,
  };

  return weatherData;
}

function addButtonFunction() {
  const form = document.getElementById("location-form");

  form.addEventListener("submit", (e) => {
    const location = getLocation(e);
    const url = getUrl(location);
    getWeatherData(url);
  });
}

function getLocation(event) {
  event.preventDefault();
  const location = event.target[0].value;
  event.target[0].value = "";
  return location;
}

function getUrl(location) {
  return `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=5d5641dbb60e66b72a7d761606b836f6&units=metric`;
}

function showWeatherData(data) {
  const divLocation = document.getElementById("div-location");
  divLocation.innerText = `${data.location}`;
  const divTemp = document.getElementById("div-temp");
  divTemp.innerText = `${data.temp} ºC`;
  const divFeelsLike = document.getElementById("div-feels-like");
  divFeelsLike.innerText = `${data.feelsLike} ºC`;
  const divMaxTemp = document.getElementById("div-max-temp");
  divMaxTemp.innerText = `${data.maxTemp} ºC`;
  const divMinTemp = document.getElementById("div-min-temp");
  divMinTemp.innerText = `${data.minTemp} ºC`;
}

addButtonFunction();
