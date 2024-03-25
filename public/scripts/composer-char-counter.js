$(document).ready(function() {
  // Character counter function
  function updateCounter() {
    const maxLength = 140;
    const currentLength = $('#tweet-text').val().length;
    const charsLeft = maxLength - currentLength;
    const counter = $('.counter'); // Select by class instead of id

    counter.text(charsLeft);

    // Change counter color based on remaining characters
    if (charsLeft < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  }

  // Update counter on input
  $('#tweet-text').on('input', updateCounter);
});
