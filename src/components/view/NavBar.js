import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

    return (<ul>
        <h2 className="timebox">TimeBox</h2>
        <div>
            <Link to="/">
                <li>Today</li>            
            </Link>
            <Link to="/thisweek">
                <li>This Week</li>            
            </Link>
            <Link to="nextweek">
                <li>Next Week</li>            
            </Link>
        </div>
    </ul>)
}

export default NavBar;