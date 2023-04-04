import { useEffect, useState } from "react";
import "./App.css";
import LocationSearch from "./components/LocationSearch";
import { getCurrentWeather } from "./utils/api"

function App() {
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
	const [weatherData, setWeatherData] = useState(null)

	// update lat and lon based on data from child component
    const handleLocationSelect = (lat, lon) => {
        setLat(lat);
        setLon(lon);
    };

	useEffect(() => {
		async function getData() {
			try {
				const data = await getCurrentWeather(lat, lon)
				setWeatherData(data)
			} catch (error) {
				console.error(error);
			}
		}
		getData()
	}, [lat, lon])

    return (
        <div className="App">
            <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>
    );
}

export default App;
