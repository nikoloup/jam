chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "View jobs",
      contexts: ["browser_action"],
      onclick: function() {
        chrome.tabs.create({ url: "main.html" });
      }
});
