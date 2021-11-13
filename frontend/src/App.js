import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import axios from 'axios';
import Admin from "layouts/Admin.js";
import Signup from "layouts/Signup";
import Signin from "layouts/Signin";

export default function App() {

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/usersignin")
      .then(({ data }) => console.log(data))
      .catch(console.log);
  }, [])

  return (
    <Router>
        <Route path="/admin" component={Admin} />
        <Route exact path="/" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Router>
  );
}