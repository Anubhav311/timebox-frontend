import React from 'react';

import '../../styles/NoMatchPage.css';

function NoMatch({location}) {
    return (
        <div className="nomatch_container">
            <div className="text_404">
                <h1>404</h1>
                <p>ERROR 404: PAGE NOT FOUND</p>
            </div>
            <div className="reroute">
                <button>Going back to Today</button>
            </div>
        </div>
    )
}

export default NoMatch;