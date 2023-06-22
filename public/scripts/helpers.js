// this function takes a textarea and updates its height based on whats currently in the input.
// use it in conjunction with an 'input' eventHandler
const updateTextareaHeight = ($textarea) => {
  $textarea.css("height", "auto");
  $textarea.css("height", $textarea.prop("scrollHeight") + "px");
}

// use this function to escape user input and prevent cross-site scripting attacks.
const escapeInput = (input) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(input));
  return div.innerHTML;
};