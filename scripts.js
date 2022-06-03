async function getData(url) {
  try {
    const response = await fetch(url, { mode: "cors" });
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    console.log(err);
  }
}

function getWeatherData(url) {
  getData(url).then((data) => {
    console.log(createDataObj(data));
  });
}

function createDataObj(data) {
  const weatherData = {
    temp: data.main.temp,
    feelsLike: data.main.feels_like,
    maxTemp: data.main.temp_max,
    minTemp: data.main.temp_min,
    location: data.name,
  };
  return weatherData;
}

function addButtonFunction() {
  const form = document.getElementById("location-form");

  form.addEventListener("submit", (e) => {
    const location = getLocation(e);
    console.log(location);
  });
}

function getLocation(event) {
  event.preventDefault();
  const location = event.target[0].value;
  event.target[0].value = "";
  return location;
}

let url =
  "http://api.openweathermap.org/data/2.5/weather?q=London&APPID=5d5641dbb60e66b72a7d761606b836f6";

addButtonFunction();
getWeatherData(url);
