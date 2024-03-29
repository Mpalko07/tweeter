/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet);
  }
};

const createTweetElement = function(tweet) {
  let $tweet = $(`
    <article class="tweet">
      <header>
        <div class="profile-info">
          <img src="${tweet.user.avatars}" alt="User Avatar">
          <h3>${tweet.user.name}</h3>
          <span>${tweet.user.handle}</span>
        </div>
      </header>
      <div class="tweet-content">
        <p>${tweet.content.text}</p>
      </div>
      <footer>
        <span class="timestamp">${tweet.created_at}</span>
      </footer>
    </article>
  `);

  return $tweet;
};

// Call the renderTweets function with the data array
renderTweets(data);
