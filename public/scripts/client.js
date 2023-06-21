/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  const $tweetForm = $("#form-new-tweet");  
  
  const loadTweets = () => {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
      success: (response) => {
        renderTweets(response, ".tweets");
      }
    });
  }
  // add eventHandler to tweet submission form.  
  $tweetForm.submit((event) => {
    event.preventDefault(); 
    const tweetText = $tweetForm.find("#tweet-text").val();
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: $tweetForm.serialize(),
      success: (response) => {
        console.log("Success!", response);
        $tweetForm.find("#tweet-text").val("");
      },
      complete: loadTweets
    });
  });  

  // receives an object with tweet related data and returns a jQuery html object.
  const createTweetElement = (tweetObj) => {
    console.log("obj:", tweetObj);
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
        <span>${timeago.format(tweetObj.created_at)}</span>
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

  // renders the htmlString from an array of tweets and appends it to the passed in selector.
  const renderTweets = (tweets, selector) => {
    // empty the tweet container, as to not generate doubles.
    $(selector).empty();
    // re-order the tweets to have the latest ones on top.
    tweets.sort((a,b) => b.created_at - a.created_at);
    for (const tweet of tweets) {
      $(selector).append(createTweetElement(tweet));
    }
  };
  loadTweets();
});