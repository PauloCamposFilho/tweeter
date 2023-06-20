$(document).ready(function() {
  // get input field for tweet.
  const inputField = $("#tweet-text");
  const initialHeight = inputField.height();
  // get send tweet button
  const sendTweetBtn = $("#tweet-send");

  inputField.on("input", function(event) {
    const _field = $(this);
    const currentLength = _field.val().length;
    const maxLength = _field.attr("data-maxlength");
    const _counter = $(this).parent().find(".counter");
    // update the counter
    _counter.val(maxLength - currentLength); 
    // update the textarea height (in case it's multiline now)
    _field.css("height", $(this).prop("scrollHeight") + "px");

    // if there's nothing in the textarea, reset the height.
    if (currentLength === 0) {
      _field.height(initialHeight);
    }

    // add css error/overflow classes if tweet is too long.
    if (currentLength > maxLength) {
      sendTweetBtn.addClass("disabled").prop("disabled", true);
      _counter.addClass("overflow");
      return;
    }

    // remove css error/overflow classes if tweet is fine.
    sendTweetBtn.removeClass("disabled").prop("disabled", false);
    _counter.removeClass("overflow");
  });
});