import React, { useCallback } from 'react';
import { withRouter } from 'react-router'
import app from './FBase';

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
                    <input name="password" type="password" placeholder="Placeholder" />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default withRouter(SignUp);