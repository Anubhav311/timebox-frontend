import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/NavBar.css';

function NavBar() {

    return (
    <ul className="navbar">
        <h2 className="timebox">TimeBox</h2>
        <div className="nav_items">
            <li><Link className="nav_item" to="/">Today</Link></li>
            <li><Link className="nav_item" to="/thisweek">This Week</Link></li>
            <li><Link className="nav_item" to="/nextweek">Next Week</Link></li>
        </div>
    </ul>
    )
}

export default NavBar;