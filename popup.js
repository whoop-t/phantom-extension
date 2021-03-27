// Initialize button with user's preferred color
let changeColor = document.getElementById('bigChat');

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener('change', async ({ target }) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (target.checked) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setBigChat
    });
    return;
  }
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: revertBigChat
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setBigChat() {
  let chatContainer = document.querySelector('.chat-content');
  console.log(chatContainer);
  chatContainer.style.width = '500px';
  chatContainer.style.background = 'red';
}
function revertBigChat() {
  let chatContainer = document.querySelector('.chat-content');
  console.log(chatContainer);
  chatContainer.style.width = 'unset';
  chatContainer.style.background = 'green';
}
