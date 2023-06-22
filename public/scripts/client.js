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
  // on window scroll, check if user has rolled at least 200 pixels down
  // if so, show a back to top button. Otherwise, fade it out (in case they scrolled back up)
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $("#scroll-to-top").fadeIn();
    } else {
      $("#scroll-to-top").fadeOut();
    }
  });

  // add an eventHandler to the scroll to top button being clicked
  // smooth scroll to top of page using jquery .animate method.
  $("#scroll-to-top").click((event) => {
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
    const $errorContainerSpan = $(".error-text");
    // if error is being shown, hide the div until a new error brings it back.
    if ($errorContainer.is(":visible")) {
      $errorContainer.slideUp();
    }
    if (!tweetText) {
      $errorContainerSpan.text("Tweet cannot be empty");
      $errorContainer.slideDown();
      return;
    }
    if (tweetText.length > maxLength) {
      $errorContainerSpan.text(`Tweet exceeds maximum length of ${maxLength} characters.`);
      $errorContainer.slideDown();
      return;
    }
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
      complete: loadTweets
    });
  });
  loadTweets();
});