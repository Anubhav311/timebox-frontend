import React from 'react';

import '../../styles/NoMatchPage.css';

function NoMatch({location}) {
    return (
        <div className="nomatch_container">
            {/* <div className="top_row">
                <h3>Oooops!</h3>
                <p>The page you are looking for doesn't exist</p>
            </div> */}
            <div className="mid_row">
                <h1>404</h1>
                <p>ERROR 404: PAGE NOT FOUND</p>
            </div>
            <div className="bottom_row">
                <button>Going back to Today</button>
            </div>
        </div>
    )
}

export default NoMatch;