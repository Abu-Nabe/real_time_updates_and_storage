export const verifyDetails = (username, password, bio) => {
  // alert is basically a dialog that explains what is needed
  if (username.length === 0) {
    alert("Username cannot be empty");
    return false;
  }

  if (password.length === 0) {
    alert("Password cannot be empty");
    return false;
  }

  if (bio.length === 0) {
    alert("Bio cannot be empty");
    return false;
  }
  if (bio.length > 20) {
    alert("Bio can't have more than 20 characters");
    return false;
  }

  return true
};
