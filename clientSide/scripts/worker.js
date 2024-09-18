//add event listener for messages from content script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //received message
        console.log("Message recieved from:" + sender.tab.url);

        if (request.message === "getURL") {
            //send content script it's URL
            sendResponse({ URL: sender.tab.url });
            console.log("Sent content script URL")
        }
    }
);


