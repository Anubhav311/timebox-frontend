import React, { useCallback } from 'react';
import { withRouter } from 'react-router'
import axios from 'axios';

import '../../styles/SignUp.css';
import app from '../auth/FBase';

const SignUp = ({ history }) => {
    // const handleSingUp = useCallback(async event => {
    //     event.preventDefault()
    //     const { email, password } = event.target.elements;
    //     try {
    //         await app
    //             .auth()
    //             .createUserWithEmailAndPassword(email.value, password.value);
    //         history.push("/");
    //     } catch (error) {
    //         alert(error);
    //     }
    // }, [history]);
    function handleSingUp(event) {
        event.preventDefault()
        const { email, password, name, timebox } = event.target.elements;
        const payload = {
            email: email.value,
            password: password.value,
            name: name.value,
            timebox: timebox.value
        }
        console.log(payload)

        return axios.post('http://localhost:4000/api/users', payload)
            .then(res => console.log(res.data))
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSingUp} className="signup_form">
                <label className="signup_row_1">
                    <p>Email</p>
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label className="signup_row_2">
                    <p>Password</p>
                    <input name="password" type="password" placeholder="password" />
                </label>
                <label className="signup_row_3">
                    <p>Name</p>
                    <input name="name" type="name" placeholder="name" />
                </label>
                <label className="signup_row_4">
                    <p>Timebox</p>
                    <input name="timebox" type="number" placeholder="timebox" />
                </label>
                <button className="signup_button" type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default withRouter(SignUp);