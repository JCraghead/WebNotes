var darkMode = false;

//add event listener for messages from content script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.message === "getURL") {
            //send content script it's URL
            sendResponse({ URL: sender.tab.url , darkMode: darkMode});
            console.log("Sent content script URL")
        }

        if (request.message === "updateDarkMode") {
            //update dark mode bool
            darkMode = !darkMode;
            //send response
            sendResponse({message: "updated to "+darkMode, darkMode: darkMode});
            console.log("Send repsonse to popup script");
        }
    }
);


