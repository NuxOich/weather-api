// 1. Конфигурация
const API_KEY = 'dea3bd1ef3343c3c1f9730c0b025fa9e';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// 2. DOM Элементы
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');

// Элементы для вывода данных
const cityName = document.getElementById('city-name');
const tempDisplay = document.getElementById('temp');
const descDisplay = document.getElementById('description');
const humidityDisplay = document.getElementById('humidity');
const windDisplay = document.getElementById('wind');

// Функция Отрисовки
function displayWeather(data) {
    weatherInfo.classList.remove('hidden');
    
    cityName.innerText = `${data.name}, ${data.sys.country}`;
    tempDisplay.innerText = Math.round(data.main.temp);
    descDisplay.innerText = `${data.weather[0].description}`.charAt(0).toUpperCase() + `${data.weather[0].description}`.slice(1);
    humidityDisplay.innerText = data.main.humidity;
    windDisplay.innerText = data.wind.speed;
} 

// Функция запроса (Async/Await)
async function getWeather(city) {
    try {
        // Формируем ссылку. Используем `backticks` (обратные кавычки) для вставки переменных
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;

        // Делаем запрос
        const response = await fetch(url);

        // Проверяем, не ошибся ли сервер (например, город не найден - 404)
        if(!response.ok) {
            throw new Error('Город не найден');
        }

        // Превращаем ответ сервера из текста в JSON-объект
        const data = await response.json();

        // Пока просто выведем в консоль, чтобы убедиться, что работает
        console.log("Данные от сервера:", data);
        // Взываем функцию отрисовки (которую ты напишешь ниже)
        displayWeather(data);
        cityInput.value = "";
    } catch (error) {
        // Если что-то пошло не так (нет интернета или город не тот)
        console.error("Ошибка:", error.message);
        alert(error.message);
    }
}
// getWeather('Almaty');

searchBtn.addEventListener('click', () => {
    const inputCity = cityInput.value;
    // cityInput.value = "";
    getWeather(inputCity);
})