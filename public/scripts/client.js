/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Developer note
// helper functions can be found on ./helpers.js

$(document).ready(() => {
  const $tweetForm = $("#form-new-tweet");
  const $newTweetIcon = $("nav .new-tweet i")
  
  // on window scroll, check if user has rolled at least 200 pixels down
  // if so, show a back to top button. Otherwise, fade it out.
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('#scroll-to-top').fadeIn();
    } else {
      $('#scroll-to-top').fadeOut();
    }
  });

  // smooth scroll to top of page.
  $('#scroll-to-top').click((event) => {
    event.preventDefault();
    $('html, body').animate({scrollTop : 0}, {
      duration: 500,
      complete: () => {
        $("section.new-tweet").slideDown(); // always shows in this case.
      }
    });
  });


  $newTweetIcon.on("click", () => {    
    $("section.new-tweet").slideToggle();
  })
  // add eventHandler to tweet submission form.
  $tweetForm.submit((event) => {
    const tweetText = $tweetForm.find("#tweet-text").val();
    const maxLength = $tweetForm.find("#tweet-text").data("maxlength");
    const $error_container = $(".error-message-validation");
    // if error is being shown, hide the div until a new error brings it back.
    if ($error_container.is(":visible")) {
      $error_container.fadeOut();
    }
    event.preventDefault();
    if (!tweetText) {
      $(".error-text").text("Tweet cannot be empty");
      $error_container.slideDown();
      return;
    }
    if (tweetText.length > maxLength) {
      $(".error-text").text(`Tweet exceeds maximum length of ${maxLength} characters.`);
      $error_container.slideDown();
      return;
    }
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "POST",
      data: $tweetForm.serialize(),
      success: (response) => {
        $tweetForm.find("#tweet-text").val("");
        // function from helpers.js to update the height of the textarea.
        updateTextareaHeight($tweetForm.find("#tweet-text"));
      },
      complete: loadTweets
    });
  });    
  loadTweets();
});