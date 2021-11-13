import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import Admin from "layouts/Admin.js";
import Signup from "layouts/Signup";
import Signin from "layouts/Signin";

export default function App() {

  useEffect(async () => {
    if (!localStorage.getItem("token")) return;
    let token = localStorage.getItem("token");
    // axios
    //   .get("http://localhost:8080/api/usersignin")
    //   .then(({ data }) => console.log(data))
    //   .catch(console.log);

    await axios.get("http://localhost:8080/api/usersignin", {
      headers: 
    { "Authorization": `Bearer ${token}` },
    }).then((response) => {
      let { status, data } = response;
      if (status === 200) {
        let userData = data;
      }
    })
    }, []);

  return (
    <Router>
        <Route path="/admin" component={() => {
          if (localStorage.getItem("token")) return <Admin />
          else return <Redirect to="/"/>
        }} />
        <Route exact path="/" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Router>
  );
}