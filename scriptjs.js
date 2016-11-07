var chatWindow = document.getElementById('conversation');
var sendButton = document.getElementById('new-message-button');
var imLonelyButton = document.getElementById('lonely');
var textArea = document.getElementById('new-message-body');

sendButton.onclick = getMessage;
imLonelyButton.onclick = getJoke;
textArea.onkeypress = pressEnter;

function newMessageTemplate (author, message, timestamp) {
  var newListItem = document.createElement('li');
  newListItem.className = 'message';
  newListItem.innerHTML =
          ["<a class='delete' href='#'>Delete</a>",
          "<h3 class='author'>" + author + "</h3>",
          "<p class='message-body'>" + message + "</p>",
          "<span class='timestamp'>" + timestamp + "</span>",
          ].join('\n');
  var deleteLink = newListItem.querySelector('.delete');
  deleteLink.onclick = deleteMessage;
  return newListItem;
}

function getTimestamp() {
  var day = new Date();
  var timestamp = (day.getHours() + ":" + day.getMinutes());
  return timestamp;
}

function pressEnter(e) {
 var key = e.which;
 if (key === 13) {
   e.preventDefault();
   getMessage();
 }
}

function getMessage() {
  var message = document.getElementById('new-message-body').value;
  createNewMessage(message);
}

var i = 0;

function createNewMessage(messageString) {
  var authors = ['Me', 'Myself', 'I'];
  var author = authors[i % 3];
  var timestamp=  getTimestamp();
  var newMessage = newMessageTemplate (author, messageString, timestamp);
  var messageWindow = document.getElementById('new-message-body');
  chatWindow.appendChild(newMessage);
  messageWindow.value = '';
  i++;
}

function getJoke() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var resp = JSON.parse(xhr.response);
      var joke = resp.value.joke;
      return createJokeMessage(joke);
    }
  }
  xhr.open('GET', 'http://api.icndb.com/jokes/random', true);
  xhr.send(null);
}

function createJokeMessage(messageData) {
  var author= 'Internet';
  var timestamp=  getTimestamp();
  var newMessage = newMessageTemplate (author, messageData, timestamp);
  chatWindow.appendChild(newMessage);
}

function deleteMessage() {
  var messageItem = this.parentNode;
  chatWindow.removeChild(messageItem);
}
