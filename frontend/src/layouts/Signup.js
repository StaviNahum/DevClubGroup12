import React from "react";
import axios from "axios";
import { useState } from "react";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [username, setUsername] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const onSignup = (e) => {
        e.preventDefault();
        if (!email || !companyName || !username || !firstName || !lastName || !city || !country || !postalCode || !password || !aboutMe) {
            return alert("You must enter all credentials in order to create an account.");
        }

        let userCredentials = {
            company: companyName,
            email,
            username,
            firstName,
            lastName,
            city,
            country,
            password,
            postalCode,
            aboutMe
        }
        async function postDB(userInfo) {
            try {
                const res = await axios.post("http://localhost:8080/api/user/signup", userInfo)
                localStorage.setItem("token", res.data.token);
                window.location = '/admin/user'
            }
            catch (err) {
                console.log(err);
            }
        }

        postDB(userCredentials);

    }
    return (
        <form className="create-account-form" onSubmit={onSignup}>
            <h3>Sign Up</h3>
            <div className="form-group">
                <label>Company name</label>
                <input type="text" className="form-control" placeholder="Company name" onChange={
                    (e) => { setCompanyName(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Enter username" onChange={
                    (e) => { setUsername(e.target.value); }
                } />
            </div>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={
                    (e) => { setEmail(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-control" placeholder="First name" onChange={
                    (e) => { setFirstName(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-control" placeholder="Last name" onChange={
                    (e) => { setLastName(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>City name</label>
                <input type="text" className="form-control" placeholder="City name" onChange={
                    (e) => { setCity(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>Country name</label>
                <input type="text" className="form-control" placeholder="Country name" onChange={
                    (e) => { setCountry(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>Postal code</label>
                <input type="text" className="form-control" placeholder="Postal code" onChange={
                    (e) => { setPostalCode(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={
                    (e) => { setPassword(e.target.value); }
                } />
            </div>

            <div className="form-group">
                <label>About me</label>
                <input type="text" className="form-control" placeholder="About Me" onChange={
                    (e) => { setAboutMe(e.target.value); }
                } />
            </div>

            <button value="Create Account" type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="signin">
                <a href="/signin">Signin</a>
            </p>
        </form >
    )
}

export default Signup;
