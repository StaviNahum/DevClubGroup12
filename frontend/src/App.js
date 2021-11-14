import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Signup from "layouts/Signup";
import Signin from "layouts/Signin";

export default function App() {



  return (
    <Router>
      <Route path="/admin" component={() => {
        if (localStorage.getItem("token")) return <Admin />
        else return <Redirect to="/" />
      }} />
      <Route exact path="/" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Router>
  );
}