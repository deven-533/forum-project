import React from "react";
import "./Login.css";
import Navbar from "./Navbar";
const Signup = () => {
  return (
    <>
    <Navbar/>
    <div className="login-container">
      <div className="login-class">
        <div className="username-container">
          <label className="n-name">Email</label>
          <input className="n-input" />
        </div>
        <div className="username-container">
          <label className="n-name">Password</label>
          <input className="n-input" />
        </div>
        <div className="username-container">
          <label className="n-name">Description</label>
          <input className="n-input" />
        </div>
        <div className="button-container">
          <button className="button-c">SignUp</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
