const signInButton = document.querySelector("#sign-in-button");

signInButton.addEventListener("click", (e) => {
  e.preventDefault();

  const emailElement = document.querySelector("#email");
  const passwrodElement = document.querySelector("#password");

  const signInData = {
    email: emailElement.value,
    password: passwrodElement.value,
  };

  fetch("http://localhost:3000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
        const token = data.tokens[data.tokens.length - 1].token;
        sessionStorage.setItem('token', token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
