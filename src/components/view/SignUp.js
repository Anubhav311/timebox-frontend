import React, { useCallback } from 'react';
import { withRouter } from 'react-router'
import app from './FBase';
import axios from 'axios';

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
            <form onSubmit={handleSingUp}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="password" />
                </label>
                <label>
                    Name
                    <input name="name" type="name" placeholder="name" />
                </label>
                <label>
                    Timebox
                    <input name="timebox" type="number" placeholder="timebox" />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default withRouter(SignUp);