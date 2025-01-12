chrome.action.onClicked.addListener(() => {
  // Open your frontend app in a new tab
  chrome.tabs.create({ url: "http://localhost:3000" });
});
