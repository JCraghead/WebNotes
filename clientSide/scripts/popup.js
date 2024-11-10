var darkMode = false;
getStatus();

//createNote: sends content script message to create new note
function createNote()
   {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //check if active tab is canvas
        console.log(tabs[0])
        if(tabs.length > 0 && tabs[0].url.includes("canvas.nau.edu"))
           {
            //send message "createNote"
            chrome.tabs.sendMessage(tabs[0].id, {message:"createNote"}, function(response){
                //log response
                if(response)
                   {
                    console.log(response.message);
                   }
               });
           }
       });
   }
//clearNotes: sends content script message to clear all notes
function clearNotes()
   {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //check if active tab is canvas
        if(tabs.length > 0 && tabs[0].url.includes("canvas.nau.edu"))
           {
            //send message "createNote"
            chrome.tabs.sendMessage(tabs[0].id, {message:"clearNotes"}, function(response){
                //log response
                if(response)
                   {
                    console.log(response.message);
                   }
               });
           }
       });
   }

function searchNotes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    // Send search term to the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length > 0 && tabs[0].url.includes("canvas.nau.edu")) {
            chrome.tabs.sendMessage(tabs[0].id, {message: "searchNotes", searchTerm: searchTerm}, function(response) {
                if (response) {
                    console.log(response.message);
                }
            });
        }
    });
}

function clearSearchBox()
   {
    document.getElementById("searchInput").value = "";
    searchNotes();
   }

//toggleDarkMdoe: sends message to toggle dark mode
function toggleDarkMode() {
    //send message to worker script to update dark mode bool
    (async () => {
        const response = await chrome.runtime.sendMessage({ message: "updateDarkMode"});
        if(response)
           {
            console.log("Received response from service worker: " + response.message);
            darkMode = response.darkMode;
            updateButtonText();
           }
    })();

    chrome.tabs.query({}, function(tabs) {
        //loop through all tabs
        for(let tabIndex = 0; tabIndex < tabs.length; tabIndex++)
           {
            //if tab matches we send a message
            if(tabs[tabIndex].url.includes("canvas.nau.edu"))
            {
            //send message "toggleDarkMode"
            chrome.tabs.sendMessage(tabs[tabIndex].id, {message:"toggleDarkMode"}, function(response){
                //log response
                if(response)
                {
                console.log(response.message);
                }
            });
            }
           }
    });

}

function getStatus() {
    (async () => {
        const response = await chrome.runtime.sendMessage({ message: "sendStatus"});
        if(response)
           {
            console.log("Received response from service worker: " + response.darkMode);
            darkMode = response.darkMode;
            updateButtonText();
           }
    })();

    
}

function updateButtonText() {
    if(darkMode)
        {
         document.getElementById("darkModeBtn").innerHTML = "Light Mode";
        }
     else
        {
         document.getElementById("darkModeBtn").innerHTML = "Dark Mode";
        }
}


// Add the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners
    console.log("reloaded");
    document.getElementById("noteBtn").addEventListener("click", createNote);
    document.getElementById("clearBtn").addEventListener("click", clearNotes);
    document.getElementById("searchInput").addEventListener("input", searchNotes)
    document.getElementById("clearText").addEventListener("click", clearSearchBox)
    document.getElementById("darkModeBtn").addEventListener("click", toggleDarkMode);
    // Other initializations...
});

//https://stackoverflow.com/questions/45179138/sending-message-from-popup-to-content-script-chrome-extension
