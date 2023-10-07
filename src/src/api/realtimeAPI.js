/** @format */
export function realtimeData(url, username, bio) {
  const data = {
    username: username,
    bio: bio,
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
