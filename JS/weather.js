"use strict";
const weatherContainer = document.querySelector(".weather-container");
const weather = weatherContainer.querySelector(".weather");
const COORDS = "coords";
const API_KEY = "f2b81bec26a3f720b9d83dbf49b2c945";

function getPosition() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function error() {
  alert("위치 정보를 가져올 수 없습니다.");
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const city = json.list[3].name;
      const temp = json.list[3].main.temp;
      const description = json.list[3].weather[0].description;
      weather.innerText = `${city} ${temp.toFixed(1)}°C ${description}`;
    });
}

getPosition();
