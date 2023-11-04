import React from "react";
import { Col, Row } from "react-bootstrap";
import { WiDayCloudy } from "react-icons/wi"
import { TiArrowDown, TiArrowUp } from "react-icons/ti"

const CurrentWeather = ({ weatherData }) => {
    console.log(weatherData);
    return (
        <Row>
            <Col lg={8}>
                <Row>
                    <Col sm={6} className="mb-2">
                        <div className="rounded-5 p-4" style={{backgroundImage: "url('/src/assets/weather-info-bg.jpg')", backgroundSize: "cover"}}>
                            <div><WiDayCloudy size={70} color={'white'} style={{textShadow: "0 4px #000"}}/></div>
                            <div className="text-white" style={{textShadow: "rgba(0, 0, 0, 0.4) 0px 0px 5px, rgba(0, 0, 0, 0.2) 0px 4px 2px"}}>
                                <span className="display-3 fw-bold">{weatherData.main.temp}</span>
                                {"°C"}
                                <p className="fs-4 fw-medium">{weatherData.weather[0].description}</p>
                            </div>
                            <div className="bg-light d-flex justify-content-between rounded-5 px-3 py-1" style={{fontSize: "14px"}}>
                                <p className="mb-0">Feels like {weatherData.main.feels_like}°C</p>
                                <p className="mb-0">
                                    <span className="me-2"><TiArrowDown /> {weatherData.main.temp_min}</span>
                                    <span><TiArrowUp /> {weatherData.main.temp_max}</span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} className="mb-2">
                        <div className="rounded-5 p-4 h-100" style={{backgroundImage: "url('/src/assets/weather-more-info-bg.png')", backgroundSize: "cover"}}>
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Humidity</span>
                                <span>{weatherData.main.humidity}%</span>
                            </p>
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Visibility</span>
                                <span>{weatherData.visibility/1000}km</span>
                            </p>
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Pressure</span>
                                <span>{weatherData.main.pressure}mb</span>
                            </p>
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Wind</span>
                                <span>{(weatherData.wind.speed*3.6).toFixed(2)} km/hr</span>
                            </p>
                        </div>
                    </Col>
                    <Col sm={12} className="mb-2">Charts</Col>
                </Row>
            </Col>
            <Col lg={4}>
                <Row>
                    <Col sm={6} lg={12}>Sunrise and sunset</Col>
                    <Col sm={6} lg={12}>Weather alerts</Col>
                </Row>
            </Col>
        </Row>
    );
};

export default CurrentWeather;