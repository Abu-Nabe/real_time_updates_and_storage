export function loginData(url, username, password) {
  const data = {
    username: username, 
    password: password, 
  };

  // Return the promise from the fetch call
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.text(); // Read the response as text
    })
    .then((responseText) => {
      // Return 'success' from this promise chain
      return true;
    })
    .catch((error) => {
      alert("False info");
      throw error; // Rethrow the error to handle it in the calling code
    });
}

export function registerData(url, username, password, bio) {
    const data = {
      username: username, 
      password: password, 
      bio: bio
    };
  
    fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.text(); // Read the response as text
        })
        .then((responseText) => {
          try {
            const jsonData = JSON.parse(responseText); // Attempt to parse as JSON
            console.log(jsonData);
          } catch (error) {
            console.error("JSON parse error:", error);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
      
  }
  