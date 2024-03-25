$('#tweet-text').on('input', function() {
  const maxLength = 140;
  const currentLength = $(this).val().length;
  const charsLeft = maxLength - currentLength;
  const counter = $(this).siblings('div').find('.counter');

  counter.text(charsLeft);

  if (charsLeft < 0) {
    counter.css('color', 'red');
  } else {
    counter.css('color', 'black');
  }
});