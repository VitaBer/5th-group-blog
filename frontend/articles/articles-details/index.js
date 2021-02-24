const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('article');

console.log(articleId);

// fetch(`localhost:3004/api/articles/${articleId}`)      // ToDo - update url to localhost:....
//     .then(response => response.json())
//     .then(data => displayArticle(data));

fetch('../articles.json')  // ToDo - update url to localhost:....
    .then(response => response.json())
    .then(articles => articles.filter((articleItem) => articleItem.id === articleId))
    .then(filteredArticles => filteredArticles[0])
    .then(article => displayArticle(article));

const displayArticle = (article) => {
    let articleElement = document.querySelector('#article-container');
    articleElement.innerHTML = 
        `<article>
            <div class="article-text">
                <h1>${article.title}</h1>
                <div class="introduction">${article.introduction}</div>
                <div class="article-details">
                    <img class="author-icon" src="${article.authorIcon}">
                    <span>${article.author}</span>
                    <span class="article-date">${article.date}</span>
                    <span class="article-reading-time">${article.readingDuration} min read</span>
                </div>
            </div>
            <div class="article-image">
                <img src="${article.image}">
            </div>
            <div class="article-content">
                ${article.content}
            </div>
        </article>
        <aside>
            ${article.likesCount} claps
        </aside>`;
}