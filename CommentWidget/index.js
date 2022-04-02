let commentButton = document.querySelector(".comment-button");
let commentInp = document.querySelector(".comment-inp");
let commentDivContainer = document.querySelector(".comment-container");
let modal = document.querySelector('.modal');
let replyBtn = document.querySelector('reply-button');
let replyInp = document.querySelector('reply-inp');

commentButton.addEventListener("click", (e) => {
  addComment(commentInp.value);
});

function getCurrentDateAndTime() {
  let date = new Date();
  let dateTime = date.toLocaleString([], { hour12: true });
  return dateTime;
}

function getComments() {
  fetch("http://localhost:3000/comments")
    .then((resp) => resp.json())
    .then((resp) => {
      commentSection(resp, commentDivContainer);
    });
}

function commentSection(commentArr, parent) {
  commentArr.forEach((comment) => {
    createComment(comment, parent);
  });
}

function createComment(comment, parent) {
  //date component
  let commentDate = document.createElement("div");
  commentDate.setAttribute("class", "date");
  commentDate.append(comment.date);

  //comment div
  let commentDiv = document.createElement("div");
  commentDiv.append(commentDate);
  if (comment.children.length) {
    let commentExpandBtn = document.createElement("button");
    commentExpandBtn.textContent = "+";
    commentExpandBtn.style.marginRight = "5px";
    commentDiv.append(commentExpandBtn);
    commentExpandBtn.addEventListener("click", function (e) {
      if (e.target.textContent === "+") {
        commentExpandBtn.textContent = "-";
        commentSection(comment.children, commentDiv);
      } else {
        let parent = this.parentElement;
        let childrenComments = this.parentElement.querySelectorAll(".comment");
        childrenComments.forEach((child) => {
          parent.removeChild(child);
        });
        e.target.textContent = "+";
      }
    });
  }
  let commentTime = document.createElement("span");
  commentTime.textContent = comment.time;
  commentTime.style.marginRight = "10px";
  commentTime.style.fontWeight = "bold";
  let commentPara = document.createElement("span");
  commentPara.textContent = comment.comment;
  commentDiv.classList.add("comment");
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", deleteComment.bind(comment.id));
  deleteBtn.style.marginLeft = "3px";

  let replyBtn = document.createElement("button");
  replyBtn.textContent = "Reply";
  replyBtn.addEventListener("click", replyComment.bind(comment,commentDiv));
  replyBtn.style.marginLeft = "3px";

  commentDiv.append(commentTime, commentPara, replyBtn, deleteBtn);
  commentDiv.append(document.createElement("hr"));
  parent.appendChild(commentDiv);
}

function addComment(comment) {
  let dateAndTime = getCurrentDateAndTime().split(",");
  let date = dateAndTime[0];
  let time = dateAndTime[1];
  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
      date,
      time,
      children: [],
    }),
  });
}


function replyToComment(id,comment){
    let dateAndTime = getCurrentDateAndTime().split(",");
    let date = dateAndTime[0];
    let time = dateAndTime[1];
    fetch(`http://localhost:3000/comments/${id}`, {
    method: "PUT",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
      date,
      time,
      children: [],
    }),
  });
}


function deleteComment() {
  fetch(`http://localhost:3000/comments/${this}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp))
    .catch((err) => console.log(err));
}
function editComment(comment) {

}

function replyComment(parentDiv) {
    console.log(this);
    console.log(parentDiv.parentElement);
    document.body.classList.add('modal-Background')
    modal.style.display = 'block';

}

getComments();
