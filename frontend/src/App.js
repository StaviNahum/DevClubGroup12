import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Admin from "layouts/Admin.js";
import Signup from "layouts/Signup";
import Signin from "layouts/Signin";

export default function App() {

  // () => {
  //   if (localStorage.getItem("token")) return <Admin />
  //   else return <Redirect to="/" />
  // }

  return (
    <Router>
      <Route path="/admin" component={Admin} />
      <Route exact path="/" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      {/* <Redirect from="/" to="/admin/dashboard" /> */}
    </Router>
  );
}