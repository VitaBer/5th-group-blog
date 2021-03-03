const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const url = category 
  ? `https://tvart.lt/blog/article/amount=100?category=${category}` 
  : 'https://tvart.lt/blog/article/amount=100';

const categoryElement = document.querySelector('#current-category')
categoryElement.innerHTML = category ? `${category} | ` : "";

fetch(url)
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
                <span><a href="index.html?category=${article.category}">${article.category}</a></span>
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

// ToDo -  article comments, article create, article edit, componentize