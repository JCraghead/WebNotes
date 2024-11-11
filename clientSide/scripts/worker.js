var darkMode = false;
var noteMode = "public";

//add event listener for messages from content script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.message === "getURL") {
            //send content script it's URL and status
            sendResponse({ URL: sender.tab.url , darkMode: darkMode, noteMode: noteMode});
            console.log("Sent content script URL")
        }

        if (request.message === "updateDarkMode") {
            //update dark mode bool
            darkMode = !darkMode;
            //send response
            sendResponse({message: "updated to "+darkMode, darkMode: darkMode});
            console.log("Send repsonse to popup script");
        }

        if (request.message === "updateNoteMode") {
            //update note mode var
            if(noteMode == "public")
               {
                noteMode = "private";
               }
            else
               {
                noteMode = "public";
               }
            //send response
            sendResponse({message: "updated to "+noteMode, noteMode: noteMode});
            console.log("Send repsonse to popup script");
        }

        if (request.message === "sendStatus") {
            //send response to popup.js
            sendResponse({message: "current status: dark mode: "+darkMode+" note mode: "+noteMode, darkMode: darkMode, noteMode: noteMode});
            console.log("Sent status to popup.js");
        }
    }
);


