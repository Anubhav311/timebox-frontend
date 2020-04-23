import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';

import '../../styles/Login.css';
import app from './FBase';
import { AuthContext } from './Auth.js';

const Login = ({ history }) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault()
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <div className="login_container">
            <h1>Log in</h1>
            <form onSubmit={handleLogin} className="login_form">
                <label className="row_1">
                    <p>Email</p>
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label className="row_2">
                    <p>Password</p>
                    <input name="password" type="password" placeholder="Placeholder" />
                </label>
                <button className="login_button" type="submit">Log in</button>
            </form>
        </div>
    )
}

export default withRouter(Login);