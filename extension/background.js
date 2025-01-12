chrome.action.onClicked.addListener(() => {
  // Open your frontend app in a new tab
  chrome.tabs.create({ url: "http://localhost:3000" });
});

chrome.action.onClicked.addListener(async () => {
  // Get the active tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTabUrl = tabs[0].url;

    // Send the URL to your modal, or store it in a variable or state
    chrome.storage.local.set({ activeTabUrl });
  });
});
