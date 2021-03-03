
// Shows / Hides SignIn and SignOut buttons
const toggleSignIn = () => {
    const signInButtonElement = document.querySelector('#btn-sign-in');
    const signOutButtonElement = document.querySelector('#btn-sign-out');
    if (localStorage.getItem('token')) {
      // User is signed in
      signInButtonElement.classList.add("hidden");
      signOutButtonElement.classList.remove("hidden");
  
      signOutButtonElement.addEventListener('click', (e) => {
        e.preventDefault();
        signOut();
      });
    } else {
      // User is not signed in
      signInButtonElement.classList.remove("hidden");
      signOutButtonElement.classList.add("hidden");
    }
  };
  
  // Sends request to backend to LogOut
  const signOut = () => {
    fetch(`https://tvart.lt/blog/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      localStorage.removeItem('token');
      toggleSignIn();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  
  toggleSignIn();