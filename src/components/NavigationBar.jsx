import React from "react";
import { NavLink } from "react-router-dom";
import {
    HiOutlineHome,
    HiOutlineCalendar,
    HiOutlineCollection,
} from "react-icons/hi";

const NavigationBar = () => {
    const navLinkStyles = ({ isActive }) => {
        return {
            backgroundColor: isActive ? "#f7703b" : "",
            color: isActive ? "white" : "#737373",
            padding: "8px",
            fontSize: "32px",
            display: "inline-grid",
            borderRadius: "8px",
        };
    };
    return (
        <ul
            className="list-unstyled d-flex d-md-inline-flex flex-md-column
						justify-content-between align-items-center mb-0 p-2 rounded-4"
            style={{ backgroundColor: "#edf0f0" }}
        >
            <li className="my-md-3">
                <NavLink to="/" style={navLinkStyles}>
                    <HiOutlineHome />
                </NavLink>
            </li>
            <li className="my-md-3">
                <NavLink to="/tomorrow" style={navLinkStyles}>
                    <HiOutlineCalendar />
                </NavLink>
            </li>
            <li className="my-md-3">
                <NavLink to="/10daysforecast" style={navLinkStyles}>
                    <HiOutlineCollection />
                </NavLink>
            </li>
        </ul>
    );
};

export default NavigationBar;
