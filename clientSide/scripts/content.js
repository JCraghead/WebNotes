//declare global variables
var urlString;
const pageBody = document.body;
var stickyNotes = [];
var stickyCount = 0;
var uniqueStickyId = 0;

//initWebPage: creates webpage note that tells the user
//  the webpage is audited by WebNotes
function initWebPage() {
    //create element
    const newPar = document.createElement('p');

    //add element attributes
    newPar.innerHTML = "This page is audited by WebNotes";
    newPar.style.position = "absolute";
    newPar.style.left = "300px";
    newPar.style.top = "150px";
    newPar.style.backgroundColor = 'rgb(0,0,0,0.5)';
    newPar.style.color = 'rgb(255,255,255)';
    newPar.style.zIndex = 10;

    //add new element to the page body
    pageBody.appendChild(newPar);
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
    const stickyPar = document.createElement('p');
    const stickyDelDiv = document.createElement('nb');

    //header div and paragraph become children of stickyDiv
    stickyDiv.appendChild(stickyHeaderDiv);
    stickyDiv.appendChild(stickyPar);
    stickyDiv.appendChild(stickyDelDiv);

    //css styling for header div
    stickyHeaderDiv.innerHTML = "Drag Here";
    stickyHeaderDiv.classList = ["stickyHeader"];
    stickyHeaderDiv.style.backgroundColor = 'rgb(0,0,0,0.5)';
    stickyHeaderDiv.style.color = 'rgb(255,255,255)';
    stickyHeaderDiv.style.cursor = 'grab';

    //css styling for sticky div
    stickyDiv.style.textAlign = "center";
    stickyDiv.classList = ["stickyDiv"];
    stickyDiv.id = noteId;
    stickyDiv.style.position = "absolute";
    stickyDiv.style.left = xPos;
    stickyDiv.style.top = yPos;
    stickyDiv.style.backgroundColor = color;
    stickyPar.style.color = 'rgb(0,0,0)';
    stickyDiv.style.zIndex = 10;
    stickyDiv.style.padding = "10px";

    //css styling for delete div
    stickyDelDiv.innerText = "X";
    stickyDelDiv.style.color = "rgb(255,0,0)";
    stickyDelDiv.style.cursor = "pointer";

    //css styling for sticky paragraph
    stickyPar.classList = ["stickyPar"];
    stickyPar.innerHTML = innerText;
    stickyPar.style.marginBottom = 0;

    //append new note to page body
    pageBody.appendChild(stickyDiv);

    //update drag functionality for each note
    updateDrag();
}

//add event listener for createNote button to be pressed from popup script
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        //read the message
        if (message.message == "createNote") {
            //create new note
            let newSticky = { "xPos": 300, "yPos": 300 + window.scrollY, "innerText": "New Note!", color: "rgb(255,255,0,0.5)", id: uniqueStickyId };

            stickyCount = stickyNotes.push(newSticky);
            createNote(newSticky.xPos + "px", newSticky.yPos + "px", newSticky.innerText, newSticky.color, newSticky.id);
            console.log(newSticky);

            getNewId();
        }
        //awknowledge message recieved
        sendResponse({ message: "Recieved message" });
    }
);

//get URL for current tab
let urlPromise = getURL();
urlPromise.then(result => {
    //set global URL variable
    urlString = result;
    console.log(urlString);
});


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

//DRAGABLE CODE:

//updates drag for all notes with class "stickyDiv"
function updateDrag() {
    for (let i = 0; i < stickyCount; i++) {
        dragElement(document.getElementById(stickyNotes[i].id), i);
    }
}

//credit to W3Schools.com for draggable js code; adapted by Lucas Larson
function dragElement(elmnt, index) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.children[0]) {
        // if present, the header is where you move the DIV from:
        elmnt.children[0].onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
    elmnt.children[2].onmousedown = deleteNote;

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
        // set the element's new position:
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
    }

    function deleteNote() {
        for (let i = 0; i < stickyNotes.length; i++) {
            if (stickyNotes[i].id == elmnt.id) {
                pageBody.removeChild(elmnt);
                stickyNotes.splice(i, 1);
                stickyCount--;
                console.log(stickyNotes);
                getNewId();
                break;
            }
        }

    }
}


initWebPage();