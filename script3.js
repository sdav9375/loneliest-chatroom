function ready() {
  var textbox = $('#new-message-body');
  var i = 0;

  function sendMessage() {
    var message = textbox.val();

      $('#conversation').append( "<li class='message'> \
        <a class='delete' href='#'>Delete</a>\
        <h3 class='author'>" + authors +"</h3>\
        <p class='message-body'>" + message + "</p>\
        <span class='timestamp'>" + getTime() + "</span>\
      </li>");
      $('.delete').click(function(e){
        e.preventDefault();
        $(this).parent().remove();
      });
    textbox.val("");
  }

  function getTime() {
    var date = new Date();
    return date.getHours() + ':' + date.getMinutes();
  }


  function authors() {
   var authors = ["Me", "Myself", "I"];
   return authors[i%3];
  }

  $('#new-message-button').click(function(e) {
    e.preventDefault();
    sendMessage();
  });

  textbox.keydown(function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      sendMessage();
    }
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
