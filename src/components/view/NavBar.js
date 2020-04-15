import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/NavBar.css';

function NavBar() {

    return (
    <ul className="navbar">
        <h2 className="timebox">
            <NavLink className="nav_item" style={{color: "white"}} to="/">
                <span className="T_of_timebox">T</span>imeBox
            </NavLink>
        </h2>
        <div className="nav_items">
            <li><NavLink exact to="/" className="nav_item" activeClassName="active_nav_item">Today</NavLink></li>
            <li><NavLink to="/thisweek" className="nav_item" activeClassName="active_nav_item">Week</NavLink></li>
            <li><NavLink to="/nextweek" className="nav_item" activeClassName="active_nav_item">Calendar</NavLink></li>
            <li><NavLink to="/settings" className="nav_item" activeClassName="active_nav_item">Settings</NavLink></li>
        </div>
    </ul>
    )
}

export default NavBar;