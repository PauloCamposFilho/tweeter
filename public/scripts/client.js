/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
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
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const getFormattedTweetTimeDifference = (timestamp) => {
    const _timestamp = timestamp / 1000;
    const now = new Date().getTime() / 1000;
    const difference = now - _timestamp;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // return only the most relevant relative date. (Day => Hour => Minutes => Second)
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    if (seconds > 0) return `${seconds}s`;
  };

  // receives an object with tweet related data and returns a jQuery html object.
  const createTweetElement = (tweetObj) => {
    const $tweet = $(`
    <article>
    <header>
      <div class="avatar-info">
        <img src="${tweetObj.user.avatars}" alt="avatar">
        <span>${tweetObj.user.name}</span>
      </div>
      <div class="avatar-info-username">
        <span>${tweetObj.user.handle}</span>
      </div>
    </header>
    <div class="tweet-content">
      <span>${tweetObj.content.text}</span>
    </div>
    <footer>
      <div>
        <span>${getFormattedTweetTimeDifference(tweetObj.created_at)}</span>
      </div>
      <div class="tweet-action-icon">
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
    `);
  return $tweet;
  };

  const renderTweets = (tweets, selector) => {
    for (const tweet of tweets) {
      $(selector).append(createTweetElement(tweet));
    }
  };

  renderTweets(data, ".tweets");

});