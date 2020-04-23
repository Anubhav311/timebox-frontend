import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import TaskContextProvider from './components/context/TasksContext';
import App from './components/view/App';
import { AuthProvider } from './components/view/Auth';
import './styles/GlobalStyles.css';

ReactDOM.render(
    <AuthProvider>
        <Router>
            <TaskContextProvider>
                <App />
            </TaskContextProvider>
        </Router>
    </AuthProvider>, 
document.getElementById('root'));

