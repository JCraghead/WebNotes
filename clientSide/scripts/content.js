//declare global variables
var urlString;
const pageBody = document.body;
var stickyNotes = [];
var stickyCount = 0;
var uniqueStickyId = 0;


//initWebPage: creates webpage note that tells the user
//  the webpage is audited by WebNotes
function initWebPage() {
    //get URL for current tab
    let urlPromise = getURL();
    urlPromise.then(result => {
        //set global URL variable
        urlString = result;
        console.log(urlString);
        getNewId();
        loadNotes();
        getNewId();
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
    menuItem.onclick = createNewSticky;
}

//getURL: sends a request to worker script for URL; returns the promise of the request
function getURL() {
    return (async () => {
        const response = await chrome.runtime.sendMessage({ message: "getURL" });
        console.log("Received URL from service worker: " + response.URL);
        return response.URL;
    })();
}

//function that is responsible for creating a new note
function createNote(xPos, yPos, innerText, color, noteId) {

    //create div, header div, and paragraph elements for new note
    const stickyDiv = document.createElement('div');
    const stickyHeaderDiv = document.createElement('div');
    const stickyText = document.createElement('textarea');
    const lineBreak = document.createElement('br');
    const stickyDelDiv = document.createElement('nb');

    //header div and paragraph become children of stickyDiv
    stickyDiv.appendChild(stickyHeaderDiv);
    stickyDiv.appendChild(stickyText);
    //stickyDiv.appendChild(lineBreak);
    stickyDiv.appendChild(stickyDelDiv);

    //css styling for header div
    //stickyHeaderDiv.innerHTML = " - ";
    stickyHeaderDiv.style.height = "10px";
    stickyHeaderDiv.classList = ["stickyHeader"];
    stickyHeaderDiv.style.backgroundColor = 'rgb(0,0,0,0.2)';
    stickyHeaderDiv.style.color = 'rgb(255,255,255)';
    stickyHeaderDiv.style.cursor = 'grab';
    stickyHeaderDiv.style.minWidth = "100px";
    stickyHeaderDiv.style.marginLeft = "auto";
    stickyHeaderDiv.style.marginRight = "auto";
    stickyHeaderDiv.style.borderRadius = "5px";

    //css styling for sticky div
    stickyDiv.style.textAlign = "center";
    stickyDiv.classList = ["stickyDiv"];
    stickyDiv.id = noteId;
    stickyDiv.style.position = "absolute";
    stickyDiv.style.left = xPos;
    stickyDiv.style.top = yPos;
    stickyDiv.style.backgroundColor = color;
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
    stickyDelDiv.innerText = "X";
    stickyDelDiv.style.color = "rgb(255,0,0)";
    stickyDelDiv.style.cursor = "pointer";
    stickyDelDiv.style.maxWidth = "10px";
    stickyDelDiv.style.marginLeft = "auto";
    stickyDelDiv.style.marginRight = "auto";

    //css styling for sticky paragraph
    stickyText.classList = ["stickyText"];
    stickyText.style.color = 'rgb(0,0,0)';

    if(innerText == "")
    {
        stickyText.placeholder = "New Note!";
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
            createNewSticky();
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
        //awknowledge message recieved
        sendResponse({ message: "Recieved message" });
    }
);


function createNewSticky()
   {
    //create new note
    let newSticky = { "xPos": 300, "yPos": 300 + window.scrollY, "innerText": "", color: "rgb(255,255,0,0.8)", id: uniqueStickyId };
    stickyCount = stickyNotes.push(newSticky);
    console.log("New sticky: "+uniqueStickyId);
    createNote(newSticky.xPos + "px", newSticky.yPos + "px", newSticky.innerText, newSticky.color, newSticky.id);
    //update drag functionality for each note
    updateDrag();

    getNewId();
   }

//get lowest unique id
function getNewId()
   {
    for (let i = 0; i < stickyNotes.length+1; i++) {
        let found = false;
        for (let j = 0; j < stickyNotes.length; j++) {
            if (stickyNotes[j].id == i) {
                found = true;
                break;
            }
        }
        if (!found) {
            uniqueStickyId = i;
            break;
        }

    }
   }

//clearNotes: clears stickyNote array, resets id, removes each element from DOM, and save
function clearNotes()
   {
    //reset array and id
    stickyNotes = [];
    uniqueStickyId = 0;

    //prime loop with stickies to clear
    let stickiesToClear = document.getElementsByClassName("stickyDiv");
    let numStickiesToClear = stickiesToClear.length;

    //loop through every sticky element
    while(numStickiesToClear != 0)
    {
        //remove sticky
        document.body.removeChild(stickiesToClear[0]);

        //reprime loop
        stickiesToClear = document.getElementsByClassName("stickyDiv");
        numStickiesToClear = stickiesToClear.length;
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
    const matchingNotes = stickyNotes.filter(note => note.innerText.toLowerCase().includes(searchTerm.toLowerCase()));

    // Print matching notes to console
    if (matchingNotes.length > 0) {
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
    elmnt.children[elmnt.children.length - 1].onmousedown = deleteNote;
    elmnt.children[1].oninput = updateText;

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
                break;
            }
        }

        //save sticky notes
        saveNotes();
    }

    function deleteNote() {
        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id == elmnt.id) {
                pageBody.removeChild(elmnt);
                stickyNotes.splice(i, 1);
                stickyCount--;
                getNewId();
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
            if (stickyNotes[i].id == elmnt.id) {
                stickyNotes[i].innerText = elmnt.children[1].value;
                break;
            }
        }
        //save sticky notes
        saveNotes();

    }

    

}

function saveNotes()
       {
        localStorage.setItem(urlString+"stickyData", JSON.stringify(stickyNotes));
        console.log("notes saved!");
        sendNotesToServer();
       }

function loadNotes()
   {
    console.log(urlString+"/stickyData");
    let stickyData = localStorage.getItem(urlString+"stickyData");
    if(stickyData)
    {
        console.log("loading notes");
        stickyNotes = JSON.parse(stickyData);
        stickyCount = stickyNotes.length;
        for(let i = 0; i < stickyNotes.length; i++)
        {
            createNote(stickyNotes[i].xPos, stickyNotes[i].yPos, stickyNotes[i].innerText, stickyNotes[i].color, stickyNotes[i].id);
        }
        console.log(stickyNotes);
        //update drag functionality for each note
        updateDrag();
        
    }
   }

//sendNotesToServer: sends current note array to server
async function sendNotesToServer()
   {
    console.log("sending notes to server...");
    try
       {
        //send post request with fetch
        const response = await fetch("http://127.0.0.1:5000/sendNotes", 
           {
            method: "POST",
            body: JSON.stringify(stickyNotes),
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

initWebPage();
