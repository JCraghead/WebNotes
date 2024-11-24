var darkMode = false;
var noteMode = "public";
var loggedInUser = null; // Variable to store the logged-in user's data

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
        // Handle login requests
        if (request.message === "login") {
            const { username, password } = request;

            // Example login validation (replace this with server-side validation or secure logic)
            if (username === "testUser" && password === "password123") {
                loggedInUser = { username: "testUser", role: "user" }; // Example user data
                sendResponse({ success: true, message: "Login successful!", userData: loggedInUser });
                console.log("User logged in:", loggedInUser);
            } else {
                sendResponse({ success: false, message: "Invalid username or password." });
                console.log("Login failed for username:", username);
            }
        }
        // Handle logout requests
        if (request.message === "logout") {
            if (loggedInUser) {
                console.log("User logged out:", loggedInUser);
                loggedInUser = null; // Clear user data
                sendResponse({ success: true, message: "Logged out successfully." });
            } else {
                sendResponse({ success: false, message: "No user is currently logged in." });
            }
        }

    }
);


