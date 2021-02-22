fetch('../articles/articles.json')      // ToDo - update url to localhost:....
    .then(response => response.json())
    .then(data => showArticles(data));

const showArticles = (articlesList) => {
    let containerElement = document.querySelector('#articles-container');
    articlesList.forEach(article => {
        let articleElement = document.createElement('div');
        articleElement.className = 'article';
        articleElement.innerHTML = 
            `<div class="article-text">
                <h3>
                    <img class="author-icon" src="${article.authorIcon}">
                    <span>${article.author}</span>
                    <span> in </span>
                    <span>${article.category}</span>
                </h3>
                <h2><a href="../articles/articles-details/index.html?article=${article.id}">${article.title}</a></h2>
                <div class="introduction">${article.introduction}</div>
                <div class="article-details">
                    <span class="article-date">${article.date}</span>
                    <span class="article-reading-time">${article.readingDuration}</span>
                </div>
            </div>
            <div class="article-image">
                <img src="${article.image}">
            </div>`;

        containerElement.appendChild(articleElement);
    });
}