fetch("https://tvart.lt/blog/article/amount=100")
  .then((response) => response.json())
  .then((data) => {
    showArticles(data)
  });

const showArticles = (articlesList) => {
  let containerElement = document.querySelector("#articles-container");
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  articlesList.forEach((article) => {
    let articleDate = new Date(article.date);
    let articleElement = document.createElement("div");
    articleElement.className = "article";
    articleElement.innerHTML = 
        `<div class="article-summary">
            <h4>
                <img class="author-icon" src="https://tvart.lt/blog/${article.author.profileImgURL}">
                <span>${article.author.fullName}</span>
                <span class="gray"> in </span>
                <span>${article.category}</span>
            </h4>
            <h2><a href="./articles/articles-details/?article=${article._id} ">${article.header}</a></h2>
            <div class="introduction gray">
                ${article.introduction}
            </div>
            <div class="article-details">
                <span class="article-date gray">${articleDate.toLocaleDateString("en-us", dateOptions)}</span>
                <span class="article-reading-time gray">${article.readingDuration} min read</span>
                
            </div>
        </div>
        <div class="article-image">
                <img src="https://tvart.lt/blog/${article.image}">
        </div>`;

    containerElement.appendChild(articleElement);
  });
};

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
    })
  } else {
    // User is not signed in
    const signOutButtonElement = document.querySelector('#btn-sign-out');
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

// ToDo - Register functionality (button), article Details(nicer formatting with images), article cateogry comments