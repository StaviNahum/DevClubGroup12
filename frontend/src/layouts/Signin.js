import React from 'react';
import { useState } from "react";
import axios from "axios";
const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    return (
        <form className="login" onSubmit={async (e) => {
            e.preventDefault();
            if (!username || !password) {
                return alert("You must enter both a username and a password.");
            }

            let userObject = {
                username: username,
                password: password
            }
            console.log(userObject);
            const response = await axios.post("http://localhost:8080/api/usersignin", userObject);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                props.history.push("/admin");
            }
            else return alert("The Username and Password entered are invalid. Please attempt again.");
        
        }}>
        <h3>Sign In</h3>

        <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Enter username" onChange={
                    (e) => {setUsername(e.target.value);}
                    }/>
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={
                    (e) => {setPassword(e.target.value);}
                    }/>
        </div>

        <div className="form-group">
        </div>

        <button type="submit" className="btn btn-primary btn-block">Submit</button>
        <p className="forgot-password text-right">
            <a href="/">Signup</a>
        </p>
    </form>
    );
}

export default Signin;
