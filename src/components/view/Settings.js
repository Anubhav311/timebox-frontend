import React from 'react';
import app from './FBase';

function Settings() {
    return (
        <>
            <div>dayummm!!!</div>
            <button onClick={() => app.auth().signOut()}>Sign Out</button>
        </>
    )
}

export default Settings;