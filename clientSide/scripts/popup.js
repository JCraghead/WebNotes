//createNote: sends content script message to create new note
function createNote()
   {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //send message "createNote"
        chrome.tabs.sendMessage(tabs[0].id, {message:"createNote"}, function(response){
            //log response
            if(response)
                {
                 console.log(response.message);
                }
        });
    });
   }

//add event listener to Create Note button
document.getElementById("noteBtn").addEventListener("click", createNote);


//https://stackoverflow.com/questions/45179138/sending-message-from-popup-to-content-script-chrome-extension