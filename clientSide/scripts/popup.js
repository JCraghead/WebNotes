var darkMode = false;
var noteMode = "public";
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

function login() 
    {
    // Get the login input values
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    // Validate that inputs are not empty
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Send login details to the background script or server for validation
    chrome.runtime.sendMessage({ message: "login", username: username, password: password }, function(response) {
        if (response && response.success) {
            console.log("Login successful:", response.message);
            alert("Login successful!");

            // Perform post-login actions, e.g., update UI or fetch user-specific data
            updateUIAfterLogin(response.userData);
        } else {
            console.error("Login failed:", response.message);
            alert("Login failed. Please check your credentials.");
        }
    });
}

// Update the UI after a successful login
function updateUIAfterLogin(userData) {
    // Example: Display user's name or change button states
    document.getElementById("userGreeting").innerText = `Welcome, ${userData.username}!`;
    document.getElementById("loginBtn").disabled = true;
    document.getElementById("logoutBtn").style.display = "block"; // Show logout button
}

// Add a logout function
function logout() {
    chrome.runtime.sendMessage({ message: "logout" }, function(response) {
        if (response && response.success) {
            console.log("Logout successful");
            alert("You have been logged out.");
            resetUIAfterLogout();
        } else {
            console.error("Logout failed:", response.message);
        }
    });
}

// Reset the UI after a logout
function resetUIAfterLogout() {
    document.getElementById("userGreeting").innerText = "";
    document.getElementById("loginBtn").disabled = false;
    document.getElementById("logoutBtn").style.display = "none"; // Hide logout button
}
//toggleDarkMode: sends message to toggle dark mode
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

//toggleNoteMode: sends message to toggle note mode
function toggleNoteMode() {
    //send message to worker script to update note mode bool
    (async () => {
        const response = await chrome.runtime.sendMessage({ message: "updateNoteMode"});
        if(response)
           {
            console.log("Received response from service worker: " + response.message);
            noteMode = response.noteMode;
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
            chrome.tabs.sendMessage(tabs[tabIndex].id, {message:"toggleNoteMode"}, function(response){
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
            console.log("Received response from service worker: " + response.message);
            darkMode = response.darkMode;
            noteMode = response.noteMode;
            updateButtonText();
           }
    })();

    
}

function exportNotes()
   {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //check if active tab is canvas
        console.log(tabs[0])
        if(tabs.length > 0 && tabs[0].url.includes("canvas.nau.edu"))
           {
            //send message "exportNotes"
            chrome.tabs.sendMessage(tabs[0].id, {message:"exportNotes"}, function(response){
                //log response
                if(response)
                   {
                    console.log(response.message);
                   }
               });
           }
       });
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

    if(noteMode == "public")
        {
        document.getElementById("noteModeBtn").innerHTML = "New Notes: Public";
        }
    else
        {
        document.getElementById("noteModeBtn").innerHTML = "New Notes: Private";
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
    document.getElementById("noteModeBtn").addEventListener("click", toggleNoteMode);
    document.getElementById("exportNotesBtn").addEventListener("click", exportNotes);
    
    // Add event listeners for login and logout
    document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("logoutBtn").addEventListener("click", logout);
});
    // Other initializations...
});

//https://stackoverflow.com/questions/45179138/sending-message-from-popup-to-content-script-chrome-extension
