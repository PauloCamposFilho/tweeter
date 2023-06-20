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
    _counter.val(maxLength - currentLength);    
    _field.css("height", $(this).prop("scrollHeight") + "px");
    
    if (currentLength === 0) {
      _field.height(initialHeight);
    }
    
    if (currentLength > maxLength) {
      sendTweetBtn.addClass("disabled").prop("disabled", true);
      _counter.addClass("overflow");
      return;
    }
    
    sendTweetBtn.removeClass("disabled").prop("disabled", false);
    _counter.removeClass("overflow");
  });
});