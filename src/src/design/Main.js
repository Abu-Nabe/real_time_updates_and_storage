/** @format */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { url_path } from "./../extension/extensionStrings";
import { usersData, authenticateData, updateData, deleteData } from "./../api/mainAPI";
import { realtimeData } from "./../api/realtimeAPI";
import { elasticData } from "./../api/elasticAPI";

import "./../style/main.css";

import Pusher from "pusher-js"; 
function Main() {
  const navigate = useNavigate();
  
  const [nameString, setNameString] = useState("Name");
  const [bioString, setBioString] = useState("Bio");

  // user data will be stored in array 
  const [usersArray, setUsersArray] = useState([]);

  // userArray doesn't store value for some reason, so have to create a duplicate array for updates
  var updateArray = []
  useEffect(() => {
    // calls for indivudual data and to retrieve users
    Authentication();
    getUsers();

    // sets up connection for pusher
    var pusher = new Pusher('b29bc0ca1c5f33d478f8', {
      cluster: 'ap1'
    });

    // make sure everyone subscribes to a channel because it's import functionality of the mini app
    var channel = pusher.subscribe('everyone');
    channel.bind('bioChange', function(data) {
      // updates data array when received
      const { username, bio } = data;
      // Update the bio for the matching username
      realtimeBio(username, bio);

      // send data from pusher and store it in elasticData
      elasticData(data);
    });
  }, []); // The empty dependency array ensures that this effect runs only once

  
  const Authentication = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); // Parse JSON
    const username = currentUser.username; // get username from localStorage
    // Inside the useEffect, call the authenticateData function
    const url = `${url_path}users/${username}`;

    authenticateData(url)
      .then((result) => {
        // set username && bio in array to display
        setNameString(result.username);
        setBioString(result.bio);
      })
      .catch((error) => {
        // Handle any errors that occur during the authentication process
        console.error("Error during authentication:", error);
      });
  };

  const getUsers = () => {
    const url = url_path + "users";

    usersData(url)
      .then((result) => {
        // set user array after getting the result to display all users
        setUsersArray(result);
      })
      .catch((error) => {
        // Handle any errors that occur during the authentication process
        console.error("Error during authentication:", error);
      });
  };

  const updateUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    const username = currentUser.username; 
    const url = `${url_path}users/${username}`;
  
    // URL for real time
    const url2 = `${url_path}send`;
  
    const bio = document.getElementById("mainBio");
    const bioValue = bio.value.trim();
  
    // Update data and send real-time data to update for all users
    updateData(url, username, bioValue);
    realtimeData(url2, username, bioValue);

    // also set your own bio string to what you've updated it to be
    setBioString(bioValue)
    bio.value = ""
  };
  
  
  const deleteUser = () => {
   
    const currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    const username = currentUser.username; 
    const url = `${url_path}users/${username}`;

    // deletes data and then goes back to login
    deleteData(url)

    let path = `/`;
    navigate(path);
  };

  const realtimeBio = (username, bio) => {
    // better solution but array goes null so can't use
    // let array = updateArray.map((user) => {if(user.username === username){user.bio=bio} return user});
    // setUsersArray(updateArray)

    // have bug where usersArray always returns to null after retrieve users so have to find another solution to update
    // not the optimal solution but this is mini task so use
    getUsers();
  };
  
  return (
    <div>
      <div className="divContainer">
        <div className="leftDiv">
          <p className="divLabel">{nameString}</p>
          <p className="divLabel">{bioString}</p>
        </div>

        <div className="rightContainer">
          <button id="updateButton" className="rightButton" onClick={updateUser}>
            Update
          </button>
          <button id="deleteButton" className="rightButton2" onClick={deleteUser}>
            Delete
          </button>
        </div>
      </div>
      <input
        id="mainBio"
        class="mainBio"
        name="bio"
        type="text"
        placeholder="Enter something and click update to change bio"
      />
      <div className="usersDiv">
        <table className="usersTable">
            <tbody>
              {usersArray.map((users, index) => (
              <tr>
                <p className="usersText">{users.username}</p>
                <p className="usersBio">{users.bio}</p>
              </tr>
              ))}
            </tbody>
            
          </table>
      </div>
    </div>
  );
}

export default Main;
