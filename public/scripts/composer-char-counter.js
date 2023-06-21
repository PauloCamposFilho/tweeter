$(document).ready(function() {
  // get input field for tweet.
  const inputField = $("#tweet-text");
  // get send tweet button
  const sendTweetBtn = $("#tweet-send");

  const updateTextareaHeight = ($textarea) => {
    $textarea.css("height", "auto");
    $textarea.css("height", $textarea.prop("scrollHeight") + "px");
  }

  inputField.on("input", function() {
    const $field = $(this);
    const currentLength = $field.val().length;
    const maxLength = $field.data("maxlength");
    const $counter = $(this).closest(".new-tweet").find(".counter");
    // update the counter
    $counter.val(maxLength - currentLength);
    // update the textarea height based on current input
    updateTextareaHeight($field);

    // add css error/overflow classes if tweet is too long.
    if (currentLength > maxLength) {
      // sendTweetBtn.addClass("disabled").prop("disabled", true);
      $counter.addClass("overflow");
      return;
    }

    // remove css error/overflow classes if tweet is fine.
    // sendTweetBtn.removeClass("disabled").prop("disabled", false);
    $counter.removeClass("overflow");
  });
});