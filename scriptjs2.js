// on keydown enter - createNewMessage

// fix message one

var chatWindow = document.getElementById('conversation');
var sendButton = document.getElementById('new-message-button');
var imLonelyButton = document.getElementById('lonely');


function newMessageTemplate (author, message, timestamp) {
  console.log("trigger newMessageTemplate...");
  var newListItem = document.createElement('li');
  newListItem.className = 'message';
  newListItem.innerHTML =
          ["<a class='delete' href='#'>Delete</a>",
          "<h3 class='author'>" + author + "</h3>",
          "<p class='message-body'>" + message + "</p>",
          "<span class='timestamp'>" + timestamp + "</span>",
          ].join('\n');
          console.log(newListItem);
  var deleteLink = newListItem.querySelector('.delete');
  deleteLink.onclick = deleteMessage;
  return newListItem;
}

function getAuthor() {
  console.log("get author...");
  var i = 0;
  var authors = ['Me', 'Myself', 'I'];
  var author = authors[i % 3];
  createNewMessage(author);
}

function getMessage() {
  console.log("get message...");
  // take content from textarea#new-message-body set to variable newMessage
}

function getTimestamp() {
  console.log("get timestamp...");
  var day = new Date();
  var timestamp = (day.getHours() + ":" + day.getMinutes());
  return timestamp;
}

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var resp = JSON.parse(xhr.response);
      var joke = resp.value.joke;
      console.log('inside joke success')
      return createJokeMessage(joke);
      }
    }
    xhr.open('GET', 'http://api.icndb.com/jokes/random', true);
    xhr.send(null);
  }

function createNewMessage(authorData) {
  console.log("trigger createNewMessage...");
  // When input type button #new-message-button is clicked or hit 'enter'

  var author = authorData;
  console.log(author);
  var message= getMessage();
  var timestamp=  getTimestamp();

  // pass it to newMessageTemplate()
  var newMessage = newMessageTemplate (author, "message", timestamp);
  chatWindow.appendChild(newMessage);

}

function createJokeMessage(messageData) {
  console.log("trigger createJokeMessage...");
    var author= 'Internet';
    var timestamp=  getTimestamp();
    console.log("in createJokeMessage right before joke cl");
    console.log(messageData)
    console.log(timestamp);

    var newMessage = newMessageTemplate (author, messageData, timestamp);

    chatWindow.appendChild(newMessage);
}


function deleteMessage() {
  console.log("trigger deleteMessage...");
  var messageItem = this.parentNode;
  chatWindow.removeChild(messageItem);
}

sendButton.onclick = getAuthor;
imLonelyButton.onclick = getJoke;
