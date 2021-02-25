const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('article');

console.log(articleId);

fetch(`https://tvart.lt/blog/article/${articleId}`)
    .then(response => response.json())
    .then(data => displayArticle(data));

const displayArticle = (article) => {
    let articleDate = new Date(article.date);
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    let articleElement = document.querySelector('#article-container');
    articleElement.innerHTML = 
        `<article>
            <div class="article-headline">
                <h1>${article.header}</h1>
                <div class="introduction">${article.introduction}</div>
                <div class="article-details">
                    <img class="author-icon" src="${article.authorIcon}">
                    <span>${article.author}</span>
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
            ${article.claps} claps
        </aside>`;
}