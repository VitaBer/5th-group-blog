fetch("https://tvart.lt/blog/article/amount=100")
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    showArticles(data)
  });

const showArticles = (articlesList) => {
  let containerElement = document.querySelector("#articles-container");
  articlesList.forEach((article) => {
    let articleElement = document.createElement("div");
    articleElement.className = "article";
    articleElement.innerHTML = 
        `<div class="article-summary">
            <h4>
                <span>${article.author.fullname}</span>
                <span class="gray"> in </span>
                <span>${article.category}</span>
            </h4>
            <h2><a href="./articles/articles-details/?article=${article._id} ">${article.header}</a></h2>
            <div class="introduction gray">
                ${article.introduction}
            </div>
            <div class="article-details">
                <span class="article-date gray">${article.date}</span>
                <span class="article-reading-time gray">${article.readingDuration} min read</span>
                
            </div>
        </div>
        <div class="article-image">
                <img src="https://tvart.lt/blog/${article.image}">
        </div>`;

    containerElement.appendChild(articleElement);
  });
};

