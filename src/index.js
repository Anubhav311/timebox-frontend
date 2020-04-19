import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import TaskContextProvider from './components/context/TasksContext';
import App from './components/view/App';
import { AuthProvider } from './components/view/Auth';
import './styles/GlobalStyles.css';

console.log(
    process.env.REACT_APP_FIREBASE_KEY,
    process.env.REACT_APP_FIREBASE_DOMAIN,
    process.env.REACT_APP_FIREBASE_DATABASE,
    process.env.REACT_APP_FIREBASE_PROJECT_ID,
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    process.env.REACT_APP_FIREBASE_SENDER_ID,
    process.env.REACT_APP_FIREBASE_APP_ID
)

ReactDOM.render(
    <AuthProvider>
        <Router>
            <TaskContextProvider>
                <App />
            </TaskContextProvider>
        </Router>
    </AuthProvider>, 
document.getElementById('root'));

