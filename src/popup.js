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

function saveJob(){
  //TODO: Fill in implementation
  alert('I aint doing anythin yet');
}

//chrome.browserAction.onClicked.addListener(() => {
document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url,title) => {
    //If it's a LinkedIn page (add other outlets later)
    if(url.match(/www\.linkedin\.com/g)!=null){
      var jobInfo = {
        "linkedin_ID": url.match(/[0-9]+/g)[0],
        "title": title.split('|')[0],
        "company": title.split('|')[1]
      }
      var data = chrome.storage.local.get(null, (data) => {
        data.id++;
        jobInfo.id = data.id;
        data.jobs.push(jobInfo);
        chrome.storage.local.set(data, () => {
          document.getElementById("message").style.display = 'block';
        });
      });
    }
    else{
      document.getElementById("warning").style.display = 'block';
      document.getElementById("form").style.display = 'block';
    }
  });
});
