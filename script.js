$(function() {

  $('#new-message-button').on('click', sendMessage);
  $('.new-message').on('keydown', pressEnter);
  $('#conversation').on('click', '.delete', deleteMessage);
  $('#lonely').on('click', getJoke);

  function messageTemplate(author, message, timestamp) {
     return ["<li class='message'>",
             "<a class='delete' href='#'>Delete</a>",
             "<h3 class='author'>" + author + "</h3>",
             "<p class='message-body'>" + message + "</p>",
             "<span class='timestamp'>" + timestamp + "</span>",
             "</li>"].join('\n');
   }

  var i = 0;

  function sendMessage() {
   var authors = ['Me', 'Myself', 'I'];
   var author = authors[i % 3];
   var message = $('#new-message-body').val();
   $('#conversation').append(messageTemplate(author, message, getTimestamp()));
   $('#new-message-body').val('');
   i++;
  }

  function getTimestamp() {
   var day = new Date();
   var timestamp = (day.getHours() + ":" + day.getMinutes());
   return timestamp;
  }

  function pressEnter(e) {
   var key = e.which
   if (key === 13) {
     e.preventDefault();
     sendMessage();
   }
  }

  function deleteMessage() {
   $(this).parent().remove();
  }

  function getJoke() {
   $.ajax({
     url: "http://api.icndb.com/jokes/random",
     success: function(response) {
       console.log(response);
       var joke = response.value.joke;
       var author = "Internet";
       $('#conversation').append(messageTemplate(author, joke, getTimestamp()));
     }
   });
 }
});
