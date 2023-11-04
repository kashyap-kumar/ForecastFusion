import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import LocationSearch from "./components/LocationSearch";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./components/NotFound";
import { getCurrentWeather } from "./utils/api"
import CurrentWeather from "./components/CurrentWeather";

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
			<Container fluid>
				<Row>
					<Col xs={12} md={2} className="d-md-flex justify-content-center h-100">
						<NavigationBar />
					</Col>
					<Col xs={12} md={10} className="py-3 py-md-0">
						<Routes>
							<Route path="/" element={weatherData ? <CurrentWeather weatherData={weatherData} /> : "Select location for getting weather info"} />
							<Route path="/tomorrow" element={<div>Tomorrow's weather</div>} />
							<Route path="/10daysforecast" element={<div>Next 10 day's weather</div>} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Col>
				</Row>
			</Container>
        </div>
    );
}

export default App;
