//Check if it is first run
chrome.storage.local.get("firstRun", (data) => {
  if(data.firstRun==undefined){
    //TODO: Redirect to help page
    //Set firstRun to false
    data.firstRun = false;
    data.jobs = [];
    data.id = 0;
    chrome.storage.local.set(data, () => {
      console.log("Storage initialized");
    });
  }
});

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "View jobs",
      contexts: ["browser_action"],
      onclick: function() {
        chrome.tabs.create({ url: "main.html" });
      }
});
