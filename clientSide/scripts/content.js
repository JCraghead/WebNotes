//SERVER CONFIG: set to "https://webnotes.space:443" for remote server, "http://127.0.0.1:5000" for local server
const remoteServer = "https://webnotes.space:443";

//declare global variables
var urlString;
const pageBody = document.body;
var stickyNotes = [];
var currentUserID = 1;
let isDarkMode = false;
var noteMode = "public";
var localNoteId = 1000;
let currentUser = null;
// Hardcoded credentials for testing
const validUsername = "testUser";
const validPassword = "password123";

//initWebPage: creates webpage note that tells the user
//  the webpage is audited by WebNotes
function initWebPage() {
    //get URL for current tab
    let urlPromise = getURL();
    urlPromise.then(result => {
        //set global URL variable
        urlString = result.URL;
        isDarkMode = result.darkMode;
        noteMode = result.noteMode;
        console.log(urlString);
        displayNotes();
        getNotesFromServer(urlString);
    });


    const menuList = document.getElementById("menu");
    const menuItemListWrapper = document.createElement("li");
    const menuItemAnchorWrapper = document.createElement("a");
    const menuItemDivWrapper = document.createElement("div");
    const menuItem = document.createElement('img');

    menuItemDivWrapper.appendChild(menuItem);
    menuItemAnchorWrapper.appendChild(menuItemDivWrapper);
    menuItemListWrapper.appendChild(menuItemAnchorWrapper);
    menuList.appendChild(menuItemListWrapper);

    menuItem.src = chrome.runtime.getURL("./images/logo_full_text.svg");
    menuItem.style.width = "84px";
    menuItem.style.height = "62.59px";
    menuItem.style.objectFit = "contain";
    menuItem.style.cursor = "pointer";
    menuItem.onclick = addNewNoteWithMode;
}

//getURL: sends a request to worker script for URL; returns the promise of the request
function getURL() {
    return (async () => {
        const response = await chrome.runtime.sendMessage({ message: "getURL" });
        if(response)
           {
            console.log("Received URL from service worker: " + response.URL);
            return response;
           }
    })();
}

//function that is responsible for creating a new note
function createNote(noteId, userId, xPos, yPos, innerText, color, urlId, newNoteMode) {

    //create div, header div, and paragraph elements for new note
    const stickyDiv = document.createElement('div');
    const stickyHeaderDiv = document.createElement('div');
    const stickyText = document.createElement('textarea');
    const stickyDelDiv = document.createElement('img');
    const stickyButtonsDiv = document.createElement('div');
    const checkmark = document.createElement('img');
    const checkmarkDiv = document.createElement('div');
    const placeholderDiv = document.createElement('div');
    //header div and paragraph become children of stickyDiv
    stickyDiv.appendChild(stickyHeaderDiv);
    stickyDiv.appendChild(stickyText);
    //stickyDiv.appendChild(lineBreak);
    stickyButtonsDiv.appendChild(placeholderDiv);
    stickyButtonsDiv.appendChild(stickyDelDiv);
    stickyButtonsDiv.appendChild(checkmarkDiv);
    checkmarkDiv.appendChild(checkmark);
    stickyDiv.appendChild(stickyButtonsDiv);

    //css styling for header div
    //stickyHeaderDiv.innerHTML = " - ";
    stickyHeaderDiv.style.height = "10px";
    stickyHeaderDiv.classList = ["stickyHeader"];
    stickyHeaderDiv.style.cursor = 'grab';
    stickyHeaderDiv.style.minWidth = "100px";
    stickyHeaderDiv.style.marginLeft = "auto";
    stickyHeaderDiv.style.marginRight = "auto";
    stickyHeaderDiv.style.borderRadius = "5px";
    //update color of header depending on the privacy of the note
    if(newNoteMode == "public")
       {
        stickyHeaderDiv.style.backgroundColor = 'rgb(0,255,0,0.5)';
       }
    else
       {
        stickyHeaderDiv.style.backgroundColor = 'rgb(255,0,0,0.5)';
       }


    //css styling for sticky div
    stickyDiv.style.textAlign = "center";
    stickyDiv.classList = ["stickyDiv"];
    stickyDiv.id = noteId;
    stickyDiv.user = userId;
    stickyDiv.url = urlId;
    stickyDiv.style.position = "absolute";
    stickyDiv.style.left = xPos;
    stickyDiv.style.top = yPos;
    stickyDiv.style.backgroundColor = isDarkMode ? 'rgb(47,55,107)' : color;
    stickyDiv.style.zIndex = 10;
    stickyDiv.style.padding = "10px";
    stickyDiv.style.maxWidth = "500px";
    stickyDiv.style.maxHeight = "500px";
    stickyDiv.style.display = "flex";
    stickyDiv.style.justifyContent = "center";
    stickyDiv.style.flexDirection = "column";
    stickyDiv.style.boxShadow = "3px 3px 1px rgba(0, 0, 0, 0.5)";
    stickyDiv.style.borderRadius = "5px";
    stickyDiv.style.paddingBottom = 0;

    //css styling for delete div
    stickyDelDiv.src = chrome.runtime.getURL("./images/deleteButton.svg");
    stickyDelDiv.style.color = "rgb(255,0,0)";
    stickyDelDiv.style.cursor = "pointer";
    stickyDelDiv.style.maxWidth = "20px";
    stickyDelDiv.style.padding = "2.5px";
    stickyDelDiv.style.marginLeft = "auto";
    stickyDelDiv.style.marginRight = "auto";
    stickyDelDiv.style.flexGrow = "1";
    stickyDelDiv.style.borderRadius = "5px"
    stickyDelDiv.style.backgroundColor = "rgb(255,0,0,0.5)";

    //css styling for placeholder div
    placeholderDiv.style.width = "25px";

    //css styling for checkmark
    checkmark.src = chrome.runtime.getURL("./images/checkmark.svg");
    checkmark.style.height = "25px";
    checkmark.style.width = "25px";
    checkmark.style.display = "none";
    checkmark.style.cursor = "pointer";
    checkmark.style.backgroundColor = "rgb(0,255,0,0.5)"
    checkmark.style.borderRadius = "5px";

    //css styling for checkmarkDiv
    checkmarkDiv.style.width = "25px";
    checkmarkDiv.style.height = "25px";

    //css styling for stickyButtonsDiv
    stickyButtonsDiv.style.display = "flex";
    stickyButtonsDiv.style.flexWrap = "no wrap";
    stickyButtonsDiv.style.alignItems = "center";
    stickyButtonsDiv.style.paddingBottom = "3px";
    stickyButtonsDiv.style.paddingTop = "3px";


    //css styling for sticky paragraph
    stickyText.classList = ["stickyText"];
    stickyText.style.color = isDarkMode ? 'rgb(255,255,255)' : 'rgb(0,0,0)'; 

    if(innerText == "")
    {
        stickyText.placeholder = "New "+newNoteMode+" Note!";
    }
    else
    {
        stickyText.innerHTML = innerText;
    }

    stickyText.style.marginBottom = 0;
    stickyText.style.width = "100px";
    stickyText.style.maxWidth = "480px";
    stickyText.style.maxHeight = "450px";
    stickyText.style.minWidth = "100px";
    stickyText.style.minHeight = "50px";
    stickyText.contentEditable = true;
    stickyText.style.border = "none";
    stickyText.style.background = "transparent";

    

    //append new note to page body
    pageBody.appendChild(stickyDiv);
}

//add event listener for createNote button to be pressed from popup script
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        //read the message
        if (message.message == "createNote") {
            //create new note
            addNewNoteWithMode();
        }
        if(message.message == "clearNotes")
        {
            console.log("clear!!");
            clearNotes();
        }
        // Check if the message is for searching notes
        if (message.message == "searchNotes") {
            console.log("Search term received:", message.searchTerm);
            searchNotes(message.searchTerm);
        }
        if (message.message == "toggleDarkMode") {
            console.log("changing theme");
            toggleDarkMode();
        }

        if (message.message == "toggleNoteMode") {
            console.log("changing note mode")
            toggleNoteMode();
        }

        if (message.message == "exportNotes") {
            console.log("exporting notes")
            //check if there are any notes to export
            if(stickyNotes.length > 0)
               {
                exportNotes();
               }
        }
        //awknowledge message recieved
        sendResponse({ message: "Recieved message" });
    }
);


function createNewSticky(newSticky, privacy)
   {
    //create new note
    newSticky.xPos += "px";
    newSticky.yPos += "px";
    stickyNotes.push(newSticky);
    createNote(newSticky.id, newSticky.user, newSticky.xPos, newSticky.yPos, newSticky.innerText, newSticky.color, newSticky.url, privacy);
    //update drag functionality for each note
    updateDrag();
   }

function addNewNoteWithMode()
   {
    if(noteMode == "public")
       {
        getNewNoteFromServer()
       }
    if(noteMode == "private")
       {
        let newSticky = {id: localNoteId, user: currentUserID, xPos: 300, yPos: 300+window.scrollY, innerText: "", color: "rgb(255,255,0,0.8)", url: urlString, privacy: "private"};
        localNoteId++;
        createNewSticky(newSticky, "private");
        saveNotes();
       }
   }

//clearNotes: clears stickyNote array, removes each element from DOC, and save
function clearNotes()
   {
    //reset array and id
    stickyNotes = [];

    //prime loop with stickies to clear
    let stickiesToClear = document.getElementsByClassName("stickyDiv");
    let numStickiesToClear = stickiesToClear.length;

    //loop through every sticky element
    while(numStickiesToClear != 0)
    {
        //remove sticky
        document.body.removeChild(stickiesToClear[numStickiesToClear-1]);

        //reprime loop
        numStickiesToClear--;
    }
    //save notes
    saveNotes();
   }

function searchNotes(searchTerm)
{
    console.log("Searching for:", searchTerm);

    // Clear previous search highlights
    clearSearchHighlights();

    // Find matching notes
    let matchingNotes = [];
    if(stickyNotes.length > 0)
       {
        matchingNotes = stickyNotes.filter(note => note.innerText.toLowerCase().includes(searchTerm.toLowerCase()));
       }
    // Print matching notes to console
    if (matchingNotes.length > 0 && searchTerm != "") {
        console.log("Matching notes found:", matchingNotes);
        
        // Highlight matching notes
        matchingNotes.forEach(note => {
            const noteElement = document.getElementById(note.id);
            if (noteElement) {
                noteElement.style.border = "2px solid green"; // Highlight with a green border
            }
        });
    } else {
        console.log("No matching notes found.");
    }
}
function clearSearchHighlights() {
    stickyNotes.forEach(note => {
        const noteElement = document.getElementById(note.id);
        if (noteElement) {
            noteElement.style.border = ""; // Remove any highlighting
        }
    });
}
function toggleDarkMode(){
    stickyNotes.forEach(note => {
        const noteElement = document.getElementById(note.id);
        if (noteElement) {
            const textElement = noteElement.querySelector('.stickyText');
            if (!isDarkMode) {
                noteElement.style.backgroundColor = 'rgb(47,55,107)';
                textElement.style.color = 'rgb(255,255,255)';
                console.log("switching to dark");
            } else {
                noteElement.style.backgroundColor = 'rgb(255,255,0,0.8)';
                textElement.style.color = 'rgb(0,0,0)';
                console.log("switching to light");
            }
        }
    });
    isDarkMode = !isDarkMode;
}

function toggleNoteMode() {
    if(noteMode == "public")
       {
        noteMode = "private";
       }
    else
       {
        noteMode = "public";
       }
}


//DRAGABLE CODE:

//updates drag for all notes with class "stickyDiv"
function updateDrag() {
    for (let i = 0; i < stickyNotes.length; i++) {
        dragElement(document.getElementById(stickyNotes[i].id));
    }
}

//credit to W3Schools.com for draggable js code; adapted by Lucas Larson
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.children[0]) {
        // if present, the header is where you move the DIV from:
        elmnt.children[0].onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
    elmnt.children[elmnt.children.length - 1].children[1].onmousedown = deleteNote;
    elmnt.children[elmnt.children.length - 1].children[2].onmousedown = updateText;
    elmnt.children[1].oninput = toggleCheckmarkOn;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        elmnt.children[0].style.cursor = "grabbing";

    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:1
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.children[0].style.cursor = "grab";

        //set the positions for the sticky JSON
        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id == elmnt.id) {
                stickyNotes[i].xPos = elmnt.style.left;
                stickyNotes[i].yPos = elmnt.style.top;
                if(stickyNotes[i].privacy == "public")
                   {
                    //Update database
                    updateNoteInServer(i);
                   }
                break;
            }
        }
        //save sticky notes
        saveNotes();
    }

    function deleteNote() {
        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id == elmnt.id) {
                if(stickyNotes[i].privacy == "public")
                   {
                    deleteNoteInServer(i);
                   }
                pageBody.removeChild(elmnt);
                stickyNotes.splice(i, 1);
                break;
            }
        }
        //save sticky notes
        saveNotes();
    }

    function updateText()
        {
        elmnt.children[1].style.height = "auto";
        elmnt.children[1].style.height = `${elmnt.children[1].scrollHeight}px`;
        for (let i = 0; i < stickyNotes.length; i++) {
            if(stickyNotes[i].id == elmnt.id)
               {
                stickyNotes[i].innerText = elmnt.children[1].value;
                if (stickyNotes[i].privacy == "public") {
                    //Update database
                    updateNoteInServer(i);
                }
                break;
               }
        }
        //save sticky notes
        saveNotes();
        toggleCheckmarkOff();

    }

    function toggleCheckmarkOn()
       {
        elmnt.children[1].style.height = "auto";
        elmnt.children[1].style.height = `${elmnt.children[1].scrollHeight}px`;
        elmnt.children[elmnt.children.length - 1].children[2].children[0].style.display = "block";
       }

    function toggleCheckmarkOff()
       {
        elmnt.children[1].style.height = "auto";
        elmnt.children[1].style.height = `${elmnt.children[1].scrollHeight}px`;
        elmnt.children[elmnt.children.length - 1].children[2].children[0].style.display = "none";
       }
}

function exportNotes()
   {
    //create output string
    let noteDivider = "******************************\n"
    let outputString = "Exported Notes from WebNotes!\n";
    let noteText = "";
    for(let noteIndex = 0; noteIndex < stickyNotes.length; noteIndex++)
       {
        noteText = stickyNotes[noteIndex].innerText
        if(noteText == "")
           {
            noteText = "(empty)";
           }
        outputString += (noteDivider + "Note " + (noteIndex + 1) + ":\n" + noteText + "\n");
       }
    
    //create downloadable file
    let link = document.createElement('a');
    let file = new Blob([outputString], {type: 'text/plain'});
    link.href = URL.createObjectURL(file);
    link.download = "exportedNotes.txt";
    link.click();
    URL.revokeObjectURL(link.href);
   }

function saveNotes()
    {
    let localNotes = [];
    for(let i = 0; i < stickyNotes.length; i++)
       {
        if(stickyNotes[i].privacy == "private")
           {
            localNotes.push(stickyNotes[i]);
            console.log(stickyNotes[i]);
            if(stickyNotes[i].id >= localNoteId)
               {
                localNotesId = stickyNotes[i].id + 1;
               }
           }
       }
    localStorage.setItem(urlString+"stickyData", JSON.stringify(localNotes));
    console.log("notes saved!");
    }

function displayNotes()
   {
    console.log(urlString+"/stickyData");
    let stickyData = localStorage.getItem(urlString+"stickyData");
    if(stickyData)
    {
        console.log("loading notes");
        stickyNotes = JSON.parse(stickyData);
        console.log(stickyNotes);
        for(let i = 0; i < stickyNotes.length; i++)
        {
            console.log("made private note?");
            createNote(stickyNotes[i].id, stickyNotes[i].user, stickyNotes[i].xPos, stickyNotes[i].yPos, stickyNotes[i].innerText, stickyNotes[i].color, stickyNotes[i].url, "private");
        }
        //console.log(JSON.parse(stickyData));
        saveNotes();
        //update drag functionality for each note
        updateDrag();
    }
   }

    //deleteNoteInServer: sends deleted note to the server to be removed from the SQL databse
async function deleteNoteInServer(index)
    {
        console.log("sending note to server...");
        try
        {
            //send post request with fetch
            const response = await fetch(remoteServer+"/deleteNote", 
            {
                method: "POST",
                body: JSON.stringify(stickyNotes[index]),
                headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
                }
            })

            //check response intergrity
            if(!response.ok)
            {
                throw new Error('Response status: ${reponse.status}');
            }
            //display response
            console.log(await response.json())
        }
        //if server is unreachable catch error and print
        catch(error)
        {
            console.log(error.message)
        }
    }

    //updateNoteInServer: sends modified note to the server to be modified in the SQL database
async function updateNoteInServer(index)
    {
        console.log("sending note to server...");
        try
        {
            //send post request with fetch
            const response = await fetch(remoteServer+"/updateNote", 
            {
                method: "POST",
                body: JSON.stringify(stickyNotes[index]),
                headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
                }
            })

            //check response intergrity
            if(!response.ok)
            {
                throw new Error('Response status: ${reponse.status}');
            }
            //display response
            console.log(await response.json())
        }
        //if server is unreachable catch error and print
        catch(error)
        {
            console.log(error.message)
        }
    }

    //getNotesFromServer: Gets all notes from a given URL and adds them to the list of notes
async function getNotesFromServer(url)
    {
        console.log("fetching notes from server...");
        try
        {
            //send get request with fetch
            const response = await fetch(remoteServer+"/getNotes", 
            {
                method: "POST",
                body: JSON.stringify({"url": url}),
                headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
                }
            })

            //check response intergrity
            if(!response.ok)
            {
                throw new Error('Response status:'+ response.status);
            }
            //Create new notes and add them to display

            //parse notes
            let notes = await response.json();
            //check if there is only one note
            if(notes.length > 0)
            {
                notes.forEach(makeNewNote);

                function makeNewNote(note)
                {
                    console.log("many stick");
                    let newSticky = {id: note[0], user: note[1], xPos: note[2], yPos: note[3],
                        innerText: note[4], color: note[5], url: note[6], privacy: "public"};
                    createNewSticky(newSticky, "public");
                }
            }
            
        }
        //if server is unreachable catch error and print
        catch(error)
        {
            console.log(error.message)
        }
    }

    //sendNewNoteToServer: Sends request for new note to the server
async function getNewNoteFromServer()
    {
    console.log("Getting new note from server...");
    try
        {
        //send post request with fetch
        const response = await fetch(remoteServer+"/newNote", 
            {
                method: "POST",
                body: JSON.stringify({"user": currentUserID,
                       "scrollHeight": window.scrollY,
                       "url": urlString}),
                headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*"
                }
            })

        //check response intergrity
        if(!response.ok)
            {
            throw new Error('Response status: ${reponse.status}');
            }
        //parse note
        let note = await response.json();

        let newSticky = {id: note[0], user: note[1], xPos: note[2], yPos: note[3],
            innerText: note[4], color: note[5], url: note[6], privacy: "public"};
        createNewSticky(newSticky, "public");

        }
    //if server is unreachable catch error and print
    catch(error)
        {
        console.log(error.message)
        }
    }  

// Function to handle login
async function login(username, password) 
{
    console.log("Attempting to log in...");
    if (username === validUsername && password === validPassword) {
        console.log("Login successful");
        currentUser = { username }; // Mock user object
        alert(`Welcome, ${username}!`);
        document.getElementById("loginButton").style.display = "none";
        document.getElementById("logoutButton").style.display = "block";
    } else {
        console.log("Login failed: Invalid credentials");
        alert("Invalid username or password.");
    }
}

// Function to handle logout
async function logout() 
{
    console.log("Logging out...");
    currentUser = null;
    alert("You have been logged out.");
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("logoutButton").style.display = "none";
}


// Function to initialize login button and form
function initLoginForm() {
    const loginForm = document.createElement("div");
    loginForm.id = "loginForm";
    loginForm.style.position = "fixed";
    loginForm.style.top = "50%";
    loginForm.style.left = "50%";
    loginForm.style.transform = "translate(-50%, -50%)";
    loginForm.style.padding = "20px";
    loginForm.style.background = isDarkMode ? "rgb(47,55,107)" : "white";
    loginForm.style.color = isDarkMode ? "white" : "black";
    loginForm.style.boxShadow = "0px 4px 8px rgba(0,0,0,0.2)";
    loginForm.style.borderRadius = "8px";
    loginForm.style.display = "none";
    loginForm.style.zIndex = "1000";

    loginForm.innerHTML = `
        <h3>Login to WebNotes</h3>
        <label for="usernameInput">Username:</label><br>
        <input type="text" id="usernameInput" placeholder="Enter your username"><br><br>
        <label for="passwordInput">Password:</label><br>
        <input type="password" id="passwordInput" placeholder="Enter your password"><br><br>
        <button id="loginSubmitBtn">Login</button>
        <button id="cancelLoginBtn">Cancel</button>
    `;

    document.body.appendChild(loginForm);

    // Add event listeners for login form buttons
    document.getElementById("loginSubmitBtn").addEventListener("click", () => {
        const username = document.getElementById("usernameInput").value;
        const password = document.getElementById("passwordInput").value;
        login(username, password).then(() => {
            loginForm.style.display = "none"; // Hide the form after login
        });
    });

    document.getElementById("cancelLoginBtn").addEventListener("click", () => {
        loginForm.style.display = "none"; // Hide the form on cancel
    });
}

// Initialize login/logout buttons in the menu
function addLoginLogoutButtons() {

    const menuList = document.getElementById("menu");
    const menuItemListWrapper = document.createElement("li");
    const menuItemAnchorWrapper = document.createElement("a");
    const menuItemDivWrapper = document.createElement("div");

    const menuItemListWrapper2 = document.createElement("li");
    const menuItemAnchorWrapper2 = document.createElement("a");
    const menuItemDivWrapper2 = document.createElement("div");


    const loginButton = document.createElement("button");
    loginButton.id = "loginButton";
    loginButton.innerText = "Login";
    loginButton.style.margin = "5px";
    loginButton.style.backgroundColor = "yellow"; // Set background color to yellow
    loginButton.style.border = "1px solid black"; // Optional: Add a black border for contrast
    loginButton.style.color = "black"; // Set text color
    loginButton.style.padding = "10px"; // Add padding for better appearance
    loginButton.style.borderRadius = "5px"; // Optional: Add rounded corners

    menuItemDivWrapper.style.display = "flex";
    menuItemDivWrapper.style.alignItems = "center";
    menuItemDivWrapper.style.justifyContent = "center";

    menuItemDivWrapper2.style.display = "flex";
    menuItemDivWrapper2.style.alignItems = "center";
    menuItemDivWrapper2.style.justifyContent = "center";


    const logoutButton = document.createElement("button");
    logoutButton.id = "logoutButton";
    logoutButton.innerText = "Logout";
    logoutButton.style.margin = "5px";
    logoutButton.style.display = "none"; // Initially hidden
    logoutButton.style.backgroundColor = "yellow"; // Set background color to yellow
    logoutButton.style.border = "1px solid black"; // Optional: Add a black border for contrast
    logoutButton.style.color = "black"; // Set text color
    logoutButton.style.padding = "10px"; // Add padding for better appearance
    logoutButton.style.borderRadius = "5px"; // Optional: Add rounded corners

    menuItemDivWrapper.appendChild(loginButton);
    menuItemAnchorWrapper.appendChild(menuItemDivWrapper);
    menuItemListWrapper.appendChild(menuItemAnchorWrapper);
    menuList.appendChild(menuItemListWrapper);
    
    menuItemDivWrapper2.appendChild(logoutButton);
    menuItemAnchorWrapper2.appendChild(menuItemDivWrapper2);
    menuItemListWrapper2.appendChild(menuItemAnchorWrapper2);
    menuList.appendChild(menuItemListWrapper2);

    // Add event listeners
    loginButton.addEventListener("click", () => {
        document.getElementById("loginForm").style.display = "block";
    });

    logoutButton.addEventListener("click", () => {
        logout().then(() => {
            loginButton.style.display = "block";
            logoutButton.style.display = "none";
        });
    });

    // Update buttons based on login state
    if (currentUser) {
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
    }
}

// Initialize the content script
function initContentScript() {
    initLoginForm();
    addLoginLogoutButtons();
}

initContentScript();
initWebPage();

//try to export functions
try
   {
    //export functions for unit testing
    module.exports = {createNote, createNewSticky, clearNotes, searchNotes, clearSearchHighlights, 
        deleteNoteInServer, updateNoteInServer, getNotesFromServer, getNewNoteFromServer, toggleDarkMode, toggleNoteMode};
   }
catch(error)
   {
    //if this caused an error, testing is not occuring and it is running in browser
    console.log("Could not export modules, runtime environment detected");
   }