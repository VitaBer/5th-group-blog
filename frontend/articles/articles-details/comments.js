const urlParameters = new URLSearchParams(window.location.search);
const articleIdentifier = urlParameters.get("article");

const refreshComments = () => {
  fetch(`https://tvart.lt/blog/comment/getcomments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({ articleId: articleIdentifier }),
  })
    .then((response) => response.json())
    .then((data) => displayComments(data));
};

const displayComments = (commentsList) => {
  let containerElement = document.querySelector("#comments");
  containerElement.innerHTML = "";
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  commentsList.forEach((comment) => {
    let commentDate = new Date(comment.date);
    let commentElement = document.createElement("div");
    commentElement.className = "comment";
    commentElement.innerHTML = `<div class="comment-date">${commentDate.toLocaleDateString("en-us", dateOptions)}</div>
        <div class="comment-text">${comment.body}</div>`;

    containerElement.appendChild(commentElement);
  });
};

refreshComments();

const postCommentButtonElement = document.querySelector('#post-comment-button');

postCommentButtonElement.addEventListener('click', () => {
    const commentTextElement = document.querySelector('#comment-input');
    const token = localStorage.getItem("token");
    const tokenPayload = atob(token.split(".")[1]);
    const signedInUserId = tokenPayload._id;
    if (!commentTextElement.value) {
        return;
    }

    fetch(`https://tvart.lt/blog/comment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ body: commentTextElement.value, article: articleIdentifier, author: signedInUserId})
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        commentTextElement.value = "";
        refreshComments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

});
