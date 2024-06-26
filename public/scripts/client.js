/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Event listener for form submission
  $('form').submit(function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Hide the error message element if it's currently visible
    $('.error-message').slideUp();
    
    // Get tweet text from the form
    const tweetText = $('#tweet-text').val().trim();

    // Validate the tweet text
    if (!isTweetValid(tweetText)) {
      return; // Exit function without submitting the form
    }

    // If all good, continue with the form
    // Serialize the form data
    const formData = $(this).serialize();
    
    // Send the POST request to the server
    $.post('/tweets', formData)
      .done(function() {
        // If the request is successful, fetch the updated list of tweets and render them
        loadTweets();
        // Reset character counter to 140
        $('#tweet-text').val(''); // Clear tweet text
        $('.counter').text(140); // Reset counter value
      })
      .fail(function(error) {
        console.error('Error submitting tweet:', error);
      });
  });

    // Function to validate tweet text
    function isTweetValid(tweetText) {
      if (!tweetText) {
        $('.error-message').text('Error: Tweet cannot be empty.').slideDown();
        return false;
      } else if (tweetText.length > 140) {
        $('.error-message').text('Error: Tweet cannot exceed 140 characters.').slideDown();
        return false;
      }
      return true; // Tweet is valid
  };

  // Function to fetch and render tweets
  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
    .then(function(tweets) {
      renderTweets(tweets); // Call renderTweets to display the fetched tweets
    })
    .catch(function(error) {
      console.error('Error fetching tweets:', error);
    });
  }

  // Function to render tweets
  function renderTweets(tweets) {
    const $tweetsContainer = $('.tweets-container');
    $tweetsContainer.empty(); // Clear existing tweets
    
    // Loop through the tweets and prepend them to the container
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
    // Update time stamp using timeago library
    $('span.timestamp').each(function() {
      const timestamp = $(this).text();
      $(this).text(timeago.format(timestamp));
    });
  }

  // Function to create a tweet element
  function createTweetElement(tweet) {
    // Create the tweet HTML structure
    const $tweet = $(`
    <article class="tweet">
      <div class="profile-info">
      <div>
        <img src="${tweet.user.avatars}" alt="User Avatar"> 
        <span>${tweet.user.name}</span>
      </div> 
        <span>${tweet.user.handle}</span>
      </div>
      <div class="tweet-content">
        <p>${$("<div>").text(tweet.content.text).html()}</p>
        <hr> 
      </div>
      <footer>
        <span class="timestamp">${tweet.created_at}</span>
        <div class="tweet-actions">
          <i class="far fa-flag"></i> <!-- Flag icon -->
          <i class="fas fa-retweet"></i> <!-- Retweet icon -->
          <i class="far fa-heart"></i> <!-- Heart icon for like -->
      </div>
      </footer>
    </article>
  `);
    
    return $tweet;
  }

  // Load tweets when the page loads
  loadTweets();
});
