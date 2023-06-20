/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // get input field for tweet.
  const inputField = $("#tweet-text");
  // get input length left-over counter
  const counter = $("#tweet-counter");
  inputField.on("input", (event) => {
    const _field = $(event.target);
    const currentLength = _field.val().length;
    const maxLength = _field.attr("maxLength");    
    counter.val(maxLength - currentLength);
  });
});