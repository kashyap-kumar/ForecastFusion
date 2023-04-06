import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import API_KEY from "../config"

const LocationSearch = ({ onLocationSelect }) => {
    const [query, setQuery] = useState('')
    const [matchedLocations, setMatchedLocations] = useState([])
    const [selectedLocation, setSelectedLocation] = useState('')
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)

    useEffect(() => {
        // clear location suggestions if input box is empty
        if(query.length == 0) {
            setMatchedLocations([])
            return
        }

        // Set up a timer to delay making a request to the API
        const timer = setTimeout(() => {
            // Only make the request if query is atleast 3 characters long
            if(query.length >= 3) {
                // TODO: Move the api call to api.js
                fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`)
                    .then(response => response.json())
                    .then(data => setMatchedLocations(data))
                    .catch(error => console.error(error))
            }
        }, 1000); // wait 1s before making a request

        // Clean up the timer if the component is unmounted or the query changes
        return () => clearTimeout(timer);
    }, [query])

    // When user selects a location from matched locations
    const handleLocationSelect = (lat, lon, locationName) => {
        setLatitude(lat)
        setLongitude(lon)
        setSelectedLocation(locationName)

        // clear the locations and input field
        setMatchedLocations([])
        setQuery('')

        // pass the location info to parent component
        onLocationSelect(lat, lon)
    }

    return (
        <Navbar>
            <Row className="w-100 mx-auto">
                <Col xs={2} md={2} lg={2} className="d-flex align-items-center">
                    <Navbar.Brand href="/" className="mx-auto">
                        <img
                            src="/icon.svg"
                            width="56"
                            height="56"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                    </Navbar.Brand>
                </Col>

                <Col xs={10} md={5} lg={6} className="d-flex align-items-center">
                    <div className="position-relative container-fluid">
                        <Form.Control
                            name="location"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for location..."
                        />

                        {/* Show matched locations based on search query */}
                        {matchedLocations.length > 0 && (
                            <ListGroup className="position-absolute top-100">
                                {matchedLocations.map(location => {
                                    const locationName = location.name + ", " + location.state + ", " + location.country;
                                    return (
                                        <ListGroup.Item action key={location.lat} onClick={() => handleLocationSelect(location.lat, location.lon, locationName)}>
                                            {locationName}
                                        </ListGroup.Item>
                                    )
                                }
                                )}
                            </ListGroup>
                        )}
                    </div>
                </Col>

                <Col xs={12} md={5} lg={4} className="d-flex align-items-center">
                    <p className="mb-0 mx-auto text-muted">Showing forecast for <span className="text-primary">{selectedLocation == '' ? 'no location' : selectedLocation}</span></p>     
                </Col>
            </Row>
        </Navbar>
    );
};

export default LocationSearch;
