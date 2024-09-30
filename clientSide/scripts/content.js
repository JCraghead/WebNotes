//declare global variables
var urlString;
const pageBody = document.body;

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

function createNote()
   {
    const newSticky = document.createElement('p');
    newSticky.innerHTML = "New Note!";
    newSticky.style.position = "absolute";
    newSticky.style.left = "300px";
    newSticky.style.top = "300px";
    newSticky.style.backgroundColor = 'rgb(0,0,0,0.5)';
    newSticky.style.color = 'rgb(255,255,255)';
    newSticky.style.zIndex = 10;

    pageBody.appendChild(newSticky);
   }

//add event listener for createNote button to be pressed from popup script
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        //read the message
        if (message.message == "createNote") {
            //create new note
            createNote();
            console.log("create note!");
        }
        //awknowledge message recieved
        sendResponse({message:"Recieved message"});
    }
);

//get URL for current tab
let urlPromise = getURL();
urlPromise.then(result => {
    //set global URL variable
    urlString = result; 
    console.log(urlString); 
});

initWebPage();