import API_KEY from "../config";

const API_URL = 'https://api.openweathermap.org/data/2.5/';

// Retrieves the current weather for a specific location
export const getCurrentWeather = async (lat, lon) => {
    const response = await fetch(`${API_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    const data = await response.json()

    if(!response.ok)
        throw new Error(data.message || "Failed to fetch data")
    
    return data;
}

// Retrieves the 5-day weather forecast for a specific location
export const getForecast = async (lat, lon) => {
    const response = await fetch(`${API_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    const data = await response.json()

    if(!response.ok)
        throw new Error(data.message || "Failed to fetch data")
    
    return data;
}

// NOTE: FAKE DATA because of API limitation to provide hourly data
export const getHourlyData = () => {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const windDirections = ['north', 'north-east', 'east', 'south-east', 'south', 'south-west', 'west', 'north-west'];

    let weatherData = [];

    for (let i = 1; i < 12; i++) {
        let weatherObject = {
            time: `${i}PM`,
            temp: getRandomInt(10, 30), // Assuming temperature range between 10 and 30
            cloud: getRandomInt(1, 3),
            wind: getRandomInt(5, 20), // Assuming wind speed range between 5 and 20
            direction: windDirections[getRandomInt(0, 7)] // Randomly select a wind direction
        };
        weatherData.push(weatherObject);
    }

    return weatherData;
}