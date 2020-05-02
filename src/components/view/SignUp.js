import React, { useCallback } from 'react';
import { withRouter } from 'react-router'
import axios from 'axios';

import '../../styles/SignUp.css';
import app from '../auth/FBase';

const SignUp = ({ history }) => {
    const handleSingUp = useCallback(async event => {
        event.preventDefault()
        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);
    // function handleSingUp(event) {
    //     event.preventDefault()
    //     const { email, password, name, timebox } = event.target.elements;
    //     const payload = {
    //         email: email.value,
    //         password: password.value,
    //         name: name.value,
    //         timebox: timebox.value
    //     }
    //     console.log(payload)

    //     return axios.post('http://localhost:4000/api/users', payload)
    //         .then(res => console.log(res.data))
    // }

    return (
        <div>
            <div className="signup_header">
                <h2><span className="T_of_timebox">T</span>imeBox</h2>
            </div>
            <form onSubmit={handleSingUp} className="signup_form">
                <label className="signup_row_1">
                    <input className="signup_input_field" name="name" type="name" placeholder="Name" />
                </label>
                <label className="signup_row_2">
                    <input className="signup_input_field" name="email" type="email" placeholder="Email" />
                </label>
                <label className="signup_row_3">
                    <input className="signup_input_field" name="password" type="password" placeholder="password" />
                </label>
                <button className="signup_button" type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default withRouter(SignUp);