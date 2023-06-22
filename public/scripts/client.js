/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Developer note
// helper functions can be found on ./helpers.js

$(document).ready(() => {
  // the <section> element that contains the new tweet form
  const $newTweetSection = $("section.new-tweet");
  // the <form> element where a new tweet is written
  const $tweetForm = $("#form-new-tweet");
  // the <textarea> element where the text for the new tweet is input.
  const $tweetFormTextarea = $tweetForm.find("textarea");
  // the icon in the header to compose a new tweet.
  const $newTweetIcon = $("nav .new-tweet i");
  // the scroll to top button
  const $scrollToTop = $("#scroll-to-top");


  // the scroll to top button
  // on window scroll, check if user has rolled at least 200 pixels down
  // if so, show a back to top button. Otherwise, fade it out (in case they scrolled back up)
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $scrollToTop.fadeIn();
    } else {
      $scrollToTop.fadeOut();
    }
  });

  // add an eventHandler to the scroll to top button being clicked
  // smooth scroll to top of page using jquery .animate method.
  // and then show the compose tweet box, with focus --> always does this.
  $scrollToTop.click((event) => {
    event.preventDefault();
    $("html").animate({scrollTop : 0}, {
      duration: 500,
      complete: () => {
        $newTweetSection.slideDown(); // always shows in this case.
        $tweetFormTextarea.focus();   // and always focus.
      }
    });
  });


  // add eventHandler to clicking on the compose tweet icon on the header.
  $newTweetIcon.on("click", () => {
    $newTweetSection.slideToggle();
    if ($newTweetSection.is(":visible")) {
      $tweetFormTextarea.focus();
    }
  });

  // add eventHandler to tweet submission form.
  $tweetForm.submit((event) => {
    event.preventDefault();
    const tweetText = $tweetForm.find("#tweet-text").val();
    const maxLength = $tweetForm.find("#tweet-text").data("maxlength");
    const $errorContainer = $(".error-message-validation");
    if (!tweetText) {
      showErrorMessage("Tweet cannot be empty.");
      return;
    }
    if (tweetText.length > maxLength) {
      showErrorMessage(`Tweet exceeds maximum length of ${maxLength} characters.`);
      return;
    }
    // no validation errors. post the tweet.
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: $tweetForm.serialize(),
      success: (response) => {
        // clear the textarea input and trigger the input event to update
        // the counter as well as the element height in case it was multiline.
        $tweetFormTextarea.val("");
        $tweetFormTextarea.trigger('input');
      },
      // always refreshes tweets regardless of success/error. Intended funcionality in case
      // we had multiple users posting, in which case there might've been a new tweet to show.
      complete: loadTweets
    });
  });
  loadTweets();
});