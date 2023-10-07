import React from "react";
import { useNavigate } from "react-router-dom";

import { url_path } from "./../extension/extensionStrings";

import { verifyDetails } from "./../extension/verifyDetails";
import { loginData, registerData } from "./../api/loginAPI";
import "./../style/login.css";

function Login() {
  const navigate = useNavigate();

  const loginAccount = () => {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const authenticationData = {
      username: username,
    };
    const url = url_path + "login"
    loginData(url, username, password)
    .then((result) => {
      if (result) {
        // Save the data to localStorage which will be used for authentication
        localStorage.setItem("currentUser", JSON.stringify(authenticationData));

        // move to main path
        let path = `/main`;
        navigate(path);
      } else {
        // Handle the case where result is not 'success'
        console.error("Login failed");
      }
    })
    .catch((error) => {
      // Handle errors from the loginData function
      console.error(error);
    });

  };

  const createAccount = () => {
    // gets value from input elements based on id name
    // trim() removes extra spaces, so if string is "    " it'll return "" to check if it's really empty
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const bio = document.getElementById("regBio").value.trim();

    // verify details is an exported function that checks if the values are empty or if bio is more than 20 chars
    if(verifyDetails(username, password, bio)){
      const url = url_path + "users"

      // once registered, save username to localStorage for authentication reasons and navigate to main path
      registerData(url, username, password, bio)

      const authenticationData = {
        username: username,
      };

      localStorage.setItem("currentUser", JSON.stringify(authenticationData));

      let path = `/main`;
      navigate(path);
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
