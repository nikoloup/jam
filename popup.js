// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];
    var url = tab.url;
    var title = tab.title;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url,title);
  });
}

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
        if(data.jobs==undefined){
          data.jobs = [];
        }
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
