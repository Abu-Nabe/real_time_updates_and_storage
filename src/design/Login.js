import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./../style/login.css";

function Login() {
  const navigate = useNavigate();

  const loginAccount = () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const authenticationData = {
      username: username,
    };

    // Save the data to localStorage
    localStorage.setItem("currentUser", JSON.stringify(authenticationData));

    let path = `/main`;
    navigate(path);
  };

  const createAccount = () => {
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const bio = document.getElementById("regBio").value.trim();

    // alert is basically a dialog that explains what is needed
    if (username.length === 0) {
      alert("Username cannot be empty");
      return;
    }

    if (password.length === 0) {
      alert("Password cannot be empty");
      return;
    }

    if (bio.length === 0) {
      alert("Bio cannot be empty");
      return;
    }
  };

  return (
    <div>
      <div class="container">
        <div class="left-div">
          <div className="divBox">
            <p className="createLabel">Junior Backend Developer Assessment</p>
            <input
              className="username"
              id="username"
              name="username"
              placeholder="Enter username"
            ></input>
            <input
              id="password"
              class="password"
              name="password"
              type="password"
              placeholder="Enter password"
            />

            <button id="divButton" class="divButton" onClick={loginAccount}>
              Login
            </button>
          </div>
        </div>

        <div class="right-div">
          <div className="divBox">
            <p className="createLabel">Create account</p>
            <input
              className="username"
              id="regUsername"
              name="username"
              placeholder="Enter username"
            ></input>
            <input
              id="regPassword"
              class="password"
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <input
              className="bio"
              id="regBio"
              type="bio"
              name="bio"
              placeholder="Enter short quote"
            ></input>
            <button id="divButton" class="divButton" onClick={createAccount}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
