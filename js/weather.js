const apiKey = "ec7b87b9cd8865578436ef9f6e28154f";
const weatherEl = document.getElementById("weather");
const input = document.getElementById("city-input");
const btn = document.getElementById("city-btn");

// функция получения погоды
function getWeather(city = "Кардифф") {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        weatherEl.textContent = "Город не найден 🙁";
        return;
      }
      weatherEl.textContent =
        `Сейчас в городе ${data.name}: ${data.main.temp}°C, ${data.weather[0].description}`;
    })
    .catch(error => {
      console.error("Ошибка:", error);
      weatherEl.textContent = "Ошибка загрузки данных";
    });
}

// загрузка погоды по умолчанию
getWeather();

// кнопка поиска
btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) getWeather(city);
});
