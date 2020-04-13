import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/NavBar.css';

function NavBar() {

    return (
    <ul className="navbar">
        <h2 className="timebox">TimeBox</h2>
        <div className="nav_items">
            <li><NavLink className="nav_item" active to="/">Today</NavLink></li>
            <li><NavLink className="nav_item" to="/thisweek">This Week</NavLink></li>
            <li><NavLink className="nav_item" to="/nextweek">Next Week</NavLink></li>
        </div>
    </ul>
    )
}

export default NavBar;