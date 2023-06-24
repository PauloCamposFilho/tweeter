// this function takes a textarea and updates its height based on whats currently in the input.
// used in conjunction with an 'input' eventHandler
const updateTextareaHeight = ($textarea) => {
  $textarea.css("height", "auto");
  $textarea.css("height", $textarea.prop("scrollHeight") + "px");
};

// use this function to escape user input and prevent cross-site scripting attacks.
const escapeInput = (input) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
};

// receives an object with tweet related data and returns a jQuery html object.
const createTweetElement = (tweetObj) => {
  const $tweet = $(`
  <article>
  <header>
    <div class="avatar-info">
      <img src="${escapeInput(tweetObj.user.avatars)}" alt="avatar">
      <span>${escapeInput(tweetObj.user.name)}</span>
    </div>
    <div class="avatar-info-username">
      <span>${escapeInput(tweetObj.user.handle)}</span>
    </div>
  </header>
  <div class="tweet-content">
    <span>${escapeInput(tweetObj.content.text)}</span>
  </div>
  <footer>
    <div>
      <span>${timeago.format(escapeInput(tweetObj.created_at))}</span>
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
  for (const tweet of tweets) {
    $(selector).append(createTweetElement(tweet));
  }
};

const showErrorMessage = (errorText) => {
  const headerText = "tweeter";
  bootbox.alert({
    title: headerText,
    message: errorText,
    centerVertical: true
  });
};

// fetches tweets from the server and calls the renderTweets to display them.
const loadTweets = () => {
  $.ajax({
    url: "http://localhost:8080/tweets",
    method: "GET",
    success: (response) => {
      // order tweets by descending date (latest ones on top)
      response.sort((a,b) => b.created_at - a.created_at);
      renderTweets(response, ".tweets");
    },
    // if server returns an error, show it.
    error: (response) => {
      showErrorMessage(response.message);
    }
  });
};