import React, { useState } from "react";
import './LoginSignup.css';
import User from '../assets/signuplogin/user.png';
import Email from '../assets/signuplogin/email.png';
import Pass from '../assets/signuplogin/pass.png';

const SignupLogin = () => {
    const [action, setAction] = useState("Signup");

    const [details, setDetails] = useState({
        Username: "",
        Email: "",
        Password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = action === "Signup" ? 'http://localhost:5000/api/users/signup' : 'http://localhost:5000/api/users/login';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(details),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success (e.g., redirect to another page, show a success message, etc.)
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='container'>
                <div className='header'>
                    <div className='text'>{action}</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    {action === "Login" ? null : (
                        <div className='input'>
                            <img src={User} alt='' />
                            <input 
                                type='text'
                                name="Username"
                                placeholder='Username'
                                value={details.Username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <img src={Email} alt='' />
                        <input 
                            type='email'
                            name="Email"
                            placeholder='Email'
                            value={details.Email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <img src={Pass} alt='' />
                        <input 
                            type='password'
                            name="Password"
                            placeholder='Password'
                            value={details.Password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {action === "Signup" ? null : (
                    <div className="forgot-password">
                        Lost Password? <span>click here</span>
                    </div>
                )}
                <div className="submit-container">
                    <button type="submit" className={action === "Login" ? "submit gray" : "submit"}>Signup</button>
                    <button type="button" className={action === "Signup" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</button>
                </div>
            </div>
        </form>
    )
}

export default SignupLogin
