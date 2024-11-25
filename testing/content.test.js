/**
 * @jest-environment jsdom
 */
//Requires JSDOM, isomorphic-fetch, sinon-chrome, and Jest

const fetch = require('isomorphic-fetch');

const chrome = require('sinon-chrome');
window.chrome = chrome;

const mockMenu = document.createElement('div');
mockMenu.id = "menu";
document.body.appendChild(mockMenu);

const content = require('../clientSide/scripts/content');

test('Try creating new note with createNote()', () => {
    content.createNote(4, 0, 300, 300, "test note", "rgb(0,0,0)", "test.com");
    expect(document.getElementById(4)).not.toBeNull();
});

test('Try creating empty note with createNote()', () => {
    content.createNote(3, 0, 300, 300, "", "rgb(0,0,0)", "test.com");
    expect(document.getElementById(4)).not.toBeNull();
});

test('Try creating new note with createNewSticky()', () => {
    content.createNewSticky({id:2, user:0, xPos:300, yPos:300, innerText:"test note", color:"rgb(0,0,0)", url:"test.com"});
    expect(document.getElementById(2)).not.toBeNull();
});

test('Try clearing notes with clearNotes()', () => {
    content.createNote(1, 0, 300, 300, "test note", "rgb(0,0,0)", "test.com")
    expect(document.getElementsByClassName("stickyDiv")).not.toHaveLength(0);
    content.clearNotes();
    expect(document.getElementsByClassName("stickyDiv")).toHaveLength(0);
});

test('Try searching notes with searchNotes()', () => {
    content.createNewSticky({id:1, user:0, xPos:300, yPos:300, innerText:"search notes", color:"rgb(0,0,0)", url:"test.com"});
    content.createNewSticky({id:2, user:0, xPos:300, yPos:300, innerText:"secret note", color:"rgb(0,0,0)", url:"test.com"});
    expect(document.getElementById(1).style.border).toBe("");
    expect(document.getElementById(2).style.border).toBe("");
    content.searchNotes("notes");
    expect(document.getElementById(1).style.border).toBe("2px solid green");
    expect(document.getElementById(2).style.border).toBe("");
    content.searchNotes("note");
    expect(document.getElementById(1).style.border).toBe("2px solid green");
    expect(document.getElementById(2).style.border).toBe("2px solid green");
    content.searchNotes("secret");
    expect(document.getElementById(1).style.border).toBe("");
    expect(document.getElementById(2).style.border).toBe("2px solid green");
    content.clearNotes();
});

test('Try clearing searches with clearSearchHighlights()', () => {
    content.createNewSticky({id:1, user:0, xPos:300, yPos:300, innerText:"big note", color:"rgb(0,0,0)", url:"test.com"});
    content.searchNotes("note");
    expect(document.getElementById(1).style.border).toBe("2px solid green");
    content.clearSearchHighlights();
    expect(document.getElementById(1).style.border).toBe("");
    content.clearNotes();
});

test('Try getting notes from server with getNotesFromServer()', async () => {
    global.fetch = fetch;
    expect(document.getElementsByClassName("stickyDiv")).toHaveLength(0);
    await content.getNotesFromServer("https://webnotes.space");
    expect(document.getElementById(177)).not.toBeNull();
    content.clearNotes();
});

test('Try getting new note from server with getNewNoteFromServer()', async () => {
    global.fetch = fetch;
    expect(document.getElementsByClassName("stickyDiv")).toHaveLength(0);
    await content.getNewNoteFromServer();
    content.clearNotes();
});

test('Try getting toggle dark mode with toggleDarkMode()', () => {
    content.createNewSticky({id:1, user:0, xPos:300, yPos:300, innerText:"search notes", color:"rgb(0,0,0)", url:"test.com"});
    expect(document.getElementById(1).style.backgroundColor).toBe("rgb(0, 0, 0)");
    content.toggleDarkMode();
    expect(document.getElementById(1).style.backgroundColor).toBe("rgb(47, 55, 107)");
    content.clearNotes();
});

test('Try switching between public and private modes', () => {
    content.createNewSticky({id:1, user:0, xPos:300, yPos:300, innerText:"not null note", color:"rgb(0,0,0)", url:"test.com"}, "private");
    expect(document.getElementById(1)).not.toBeNull();
    content.toggleNoteMode();
    content.createNewSticky({id:2, user:0, xPos:300, yPos:300, innerText:"not null note 2", color:"rgb(0,0,0)", url:"test.com"}, "private");
    expect(document.getElementById(2)).not.toBeNull();
    content.clearNotes();
});
