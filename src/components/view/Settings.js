import React from 'react';

import app from './FBase';
import NavBar from './NavBar';

function Settings() {
    return (
        <>
            <NavBar />
            <div>dayummm!!!</div>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
        </>
    )
}

export default Settings;