const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get("article");

fetch(`https://tvart.lt/blog/article/${articleId}`)
  .then((response) => response.json())
  .then((data) => displayArticle(data));

const displayArticle = (article) => {
  let articleDate = new Date(article.date);
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };

  let articleElement = document.querySelector("#article-container");
  articleElement.innerHTML = `<article>
            <div class="article-headline">
                <h1 class="header">${article.header}</h1>
                <div class="introduction">${article.introduction}</div>
                <div class="article-details">
                    <img class="author-icon" src="https://tvart.lt/blog/${article.author.profileImgURL}">
                    <span>${article.author.fullName}</span>
                    <span class="article-date">${articleDate.toLocaleDateString("en-us", dateOptions)}</span>
                    <span class="article-reading-time">${article.readingDuration} min read</span>
                </div>
            </div>
            <div class="article-image">
                <img src="https://tvart.lt/blog/${article.image}">
            </div>
            <div class="article-body">
                ${article.body}
            </div>
        </article>
        <aside>
            <span id="article-claps">${article.claps}</span> claps
            <a id="add-clap-button">
                <i class="fas fa-sign-language" data-article="${article._id}"></i>
            </a>
        </aside>`;

  let clapButtonElement = document.querySelector("#add-clap-button");
  clapButtonElement.addEventListener("click", function (e) {
    let articleId = e.target.dataset.article;
    fetch(`https://tvart.lt/blog/article/clap/${articleId}`, {
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
        return response.json();
      })
      .then((data) => {
        const clapsElement = document.querySelector('#article-claps');
        clapsElement.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
};