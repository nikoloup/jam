/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;
    var title = tab.title;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url,title);
  });
}

//chrome.browserAction.onClicked.addListener(() => {
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url,title) => {
    //For now we assume it's a LinkedIn page
    if(url.match(/www\.linkedin\.com/g)!=null){
      var jobInfo = {
        "linkedin_ID": url.match(/[0-9]+/g)[0],
        "title": title.split('|')[0],
        "company": title.split('|')[1]
      }
      var data = chrome.storage.local.get(null, (data) => {
        //TODO: These should really be handled on install separately
        if(data.jobs==undefined){
          data.jobs = [];
        }
        if(data.id==undefined){
          data.id = 0;
        }
        data.id++;
        jobsInfo.id = data.id;
        data.jobs.push(jobInfo);
        chrome.storage.local.set(data, () => {
          var lgif = document.getElementById("loading-gif");
          document.getElementById("main").removeChild(lgif);
          document.getElementById("main").innerHTML = "<p>Job saved successfully!</p>";
        });
      });
    }
    else{
      var lgif = document.getElementById("loading-gif");
      document.getElementById("main").removeChild(lgif);
      document.getElementById("main").innerHTML = "<p>Sorry, this service is not supported yet</p>";
    }
  });
});
