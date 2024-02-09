import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { WiDayCloudy, WiStrongWind, WiThermometerExterior } from "react-icons/wi"
import { TiArrowDown, TiArrowUp } from "react-icons/ti"
import { Line, LineChart, ResponsiveContainer, XAxis, Tooltip, BarChart, Bar } from "recharts";
import { getHourlyData } from "../utils/api";
import weatherinfobg from "/src/assets/weather-info-bg.jpg";
import weathermoreinfobg from "/src/assets/weather-more-info-bg.png";

// test data for various time during the day (due to api limitations)
const hourlyData = getHourlyData();

const CurrentWeather = ({ weatherData }) => {
    console.log(weatherData);
    const [selectedOverview, setSelectedOverview] = useState("temp"); // posible values: temp and wind

    return (
        <Row>
            <Col lg={8}>
                <Row>
                    <Col sm={6} className="mb-2">
                        <div
                            className="rounded-5 p-4"
                            style={{
                                backgroundImage: `url(${weatherinfobg})`,
                                backgroundSize: "cover",
                            }}
                        >
                            <div>
                                <WiDayCloudy size={70} color={"white"} style={{ textShadow: "0 4px #000" }} />
                            </div>
                            <div
                                className="text-white"
                                style={{ textShadow: "rgba(0, 0, 0, 0.4) 0px 0px 5px, rgba(0, 0, 0, 0.2) 0px 4px 2px" }}
                            >
                                <span className="display-3 fw-bold">{weatherData.main.temp}</span>
                                {"°C"}
                                <p className="fs-4 fw-medium">{weatherData.weather[0].description}</p>
                            </div>
                            <div
                                className="bg-light d-flex justify-content-between rounded-5 px-3 py-1"
                                style={{ fontSize: "14px" }}
                            >
                                <p className="mb-0">Feels like {weatherData.main.feels_like}°C</p>
                                <p className="mb-0">
                                    <span className="me-2">
                                        <TiArrowDown /> {weatherData.main.temp_min}
                                    </span>
                                    <span>
                                        <TiArrowUp /> {weatherData.main.temp_max}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} className="mb-2">
                        <div
                            className="rounded-5 p-4 h-100"
                            style={{
                                backgroundImage: `url(${weathermoreinfobg})`,
                                backgroundSize: "cover",
                            }}
                        >
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Humidity</span>
                                <span>{weatherData.main.humidity}%</span>
                            </p>
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Visibility</span>
                                <span>{weatherData.visibility / 1000}km</span>
                            </p>
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Pressure</span>
                                <span>{weatherData.main.pressure}mb</span>
                            </p>
                            <p className="d-flex justify-content-between bg-white rounded-4 py-2 px-3">
                                <span>Wind</span>
                                <span>{(weatherData.wind.speed * 3.6).toFixed(2)} km/hr</span>
                            </p>
                        </div>
                    </Col>
                    <Col sm={12} className="mb-2 mt-md-3">
                        <div className="rounded-5 p-4 h-100" style={{ backgroundColor: "#edf0f0" }}>
                            <Row>
                                <Col sm={12}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-0">Overview of the day</p>
                                        <p className="mb-0 d-flex align-items-center">
                                            <span
                                                className="d-inline-flex justify-content-center align-items-center me-2 rounded fs-2 p-1"
                                                style={{
                                                    backgroundColor:
                                                        selectedOverview === "temp" ? "#f7703b" : "#c2c9c9",
                                                    color: selectedOverview === "temp" ? "#ffffff" : "#626669",
                                                    width: "30px",
                                                    height: "30px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => setSelectedOverview("temp")}
                                            >
                                                <WiThermometerExterior />
                                            </span>
                                            <span
                                                className="d-inline-flex justify-content-center align-items-center rounded fs-2 p-1"
                                                style={{
                                                    backgroundColor:
                                                        selectedOverview === "wind" ? "#f7703b" : "#c2c9c9",
                                                    color: selectedOverview === "wind" ? "#ffffff" : "#626669",
                                                    width: "30px",
                                                    height: "30px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => setSelectedOverview("wind")}
                                            >
                                                <WiStrongWind />
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div className="_chart-container" style={{ width: "100%", height: "200px" }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            {/* show temp chart or wind chart based on selected tab */}

                                            {selectedOverview === "temp" && (
                                                <LineChart
                                                    width={500}
                                                    height={300}
                                                    data={hourlyData}
                                                    margin={{
                                                        top: 25,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <XAxis dataKey="time" tickLine={false} />
                                                    <Tooltip
                                                        contentStyle={{ background: "transparent", border: "none" }}
                                                        labelStyle={{ display: "none" }}
                                                        separator=""
                                                        formatter={(value) => [`${value}°C`, ""]}
                                                    />
                                                    <Line type="monotone" dataKey="temp" stroke="#f7703b" dot={false} />
                                                </LineChart>
                                            )}

                                            {selectedOverview === "wind" && (
                                                <BarChart
                                                    width={500}
                                                    height={300}
                                                    data={hourlyData}
                                                    margin={{
                                                        top: 25,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <XAxis dataKey="time" tickLine={false} axisLine={false} />
                                                    <Bar dataKey="wind" fill="#f7703b" label={{ position: "top" }} />
                                                </BarChart>
                                            )}
                                        </ResponsiveContainer>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col lg={4}>
                <Row>
                    <Col sm={6} lg={12}>
                        Sunrise and sunset
                    </Col>
                    <Col sm={6} lg={12}>
                        Weather alerts
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default CurrentWeather;