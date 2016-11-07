// on keydown enter - createNewMessage
// on click delete - deleteMessage

var chatWindow = document.getElementById('conversation');
var sendButton = document.getElementById('new-message-button');
var imLonelyButton = document.getElementById('lonely');
var deleteButton = document.getElementsByClassName("delete");


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
  return newListItem;
}

function getAuthor() {
  console.log("get author...");
  var i = 0;
  var authors = ['Me', 'Myself', 'I'];
  var author = authors[i % 3];
  return author;
}

function getMessage() {
  // console.log("get message...");
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



// function createJokeMessage() {
//   getJokes(function() {
//       console.log('Pass2');
//   });
// }
//
// function getJoke(createJokeMessage) {
//     //All ajax calls called here
//     onAjaxSuccess: function() {
//         createJokeMessage();
//     };
//     console.log('Pass1');
// }



function createNewMessage() {
  console.log("trigger createNewMessage...");
  // When input type button #new-message-button is clicked or hit 'enter'

  var author = getAuthor();
  var message= getMessage();
  var timestamp=  getTimestamp();

  // pass it to newMessageTemplate()
  var newMessage = newMessageTemplate ('bob', "message", 'timestamp');
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


// when delete clicked - removes parent list item from ol
}

sendButton.onclick = createNewMessage;
imLonelyButton.onclick = getJoke;
