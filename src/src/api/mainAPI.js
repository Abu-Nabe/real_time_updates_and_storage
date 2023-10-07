export function authenticateData(url) {
  // Return the promise from the fetch call
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json(); // Read the response as text
    })
    .then((responseText) => {
      // Return 'success' from this promise chain
      return responseText;
    })
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the calling code
    });
}

export function usersData(url) {
  // Return the promise from the fetch call
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json(); // Read the response as text
    })
    .then((responseText) => {
      // Return 'success' from this promise chain
      return responseText;
    })
    .catch((error) => {
      throw error; // Rethrow the error to handle it in the calling code
    });
}

export function updateData(url, username, bio) {
  const data = {
    username: username, 
    bio: bio, 
  };
  // Return the promise from the fetch call
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        // Return a success message when the request is successful
        return "Success";
      } else {
        // Return an error message for non-OK status codes
        return `HTTP error! Status: ${res.status}`;
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      return `Error: ${error.message}`;
    });
}


export function deleteData(url) {
  // Return the promise from the fetch call
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        // Return a success message when the request is successful
        return "Success";
      } else {
        // Return an error message for non-OK status codes
        return `HTTP error! Status: ${res.status}`;
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      return `Error: ${error.message}`;
    });
}

