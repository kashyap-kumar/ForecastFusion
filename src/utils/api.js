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