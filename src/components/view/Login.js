import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import '../../styles/Login.css';
import app from '../auth/FBase';
import { AuthContext } from '../auth/Auth.js';

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
        <div>
            <div className="login_header">
                <h2><span className="T_of_timebox">T</span>imeBox</h2>
            </div>
            <h2 className="T_h2"><span className="T_of_timebox">T</span></h2>
            <h1 className="login_text">Log in</h1>
            <form onSubmit={handleLogin} className="login_form">
                <label className="login_row_1">
                    <input className="input_field" name="email" type="email" placeholder="Email" />
                </label>
                <label className="login_row_2">
                    <input className="input_field" name="password" type="password" placeholder="Password" />
                </label>
                <div className="login_row_3">
                    {/* <label className="checkbox_label">
                        <input className="checkbox" name="remember_me" type="checkbox" />
                        <p>Remeber me</p>
                    </label> */}
                    <Link to="/signup" className="forgot_password">
                        <p>Forgot password?</p>
                    </Link>
                </div>
                <button className="login_button" type="submit">Log in</button>
            </form>
            <p className="no_account_text">Don't  have  account? <Link to="/signup" className="forgot_password" ><span>Sign up</span></Link></p>
        </div>
    )
}

export default withRouter(Login);