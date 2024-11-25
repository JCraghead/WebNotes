#  **Introduction:**   
   WebNotes enhances students' study experience by simplifying note taking and organization. Targeted at students who use canvas, it allows them to capture and manage information efficiently, and boosts their academic performance. WebNotes includes many features designed to enhance the digital note-taking experience for students. Current features include making new notes either through the extension popup or on the canvas page, which will automatically be saved to the server. Users can delete single notes or use the clear all notes button to remove all notes saved on the page giving them a more organized workspace. WebNotes has a search function allowing users to search their notes with ease, giving them quick and easy access. An optional dark mode, which can be easily toggled on or off, gives users a customisable experience suited for different lighting conditions or preference. An option to export notes saves all the notes to a downloaded text file. This gives users the chance to review their notes while offline or use them elsewhere for other purposes. Users can also log into an account on their canvas page and use this to set their notes to private. By default notes are set to public but can be toggled to private when logged in. This gives security and independence to the notes users wish to create.   
     
   GitHub link: [https://github.com/JCraghead/WebNotes](https://github.com/JCraghead/WebNotes)  
     
# **Implemented Requirements:**  
## Landon Coonrod  
   * Requirement: As a user, I want to login to my account and show the notes I have saved on my page.  
   * Issue: [https://github.com/JCraghead/WebNotes/issues/53](https://github.com/JCraghead/WebNotes/issues/53)  
   * Pull request: [https://github.com/JCraghead/WebNotes/pull/52](https://github.com/JCraghead/WebNotes/pull/52)  
   * Implemented by: Landon Coonrod  
   * Approved by: Jarom Craghead  
   * Print screen:

![](/markdownImages/d6_1.png)
![](/markdownImages/d6_2.png)

![](/markdownImages/d6_3.png)
![](/markdownImages/d6_4.png)

## Lucas Larson

* Requirement: As a student, I want to export my notes in different formats, so that I can use them in different places  
* Issue: [https://github.com/JCraghead/WebNotes/issues/13](https://github.com/JCraghead/WebNotes/issues/13)  
* Pull request: [https://github.com/JCraghead/WebNotes/pull/51](https://github.com/JCraghead/WebNotes/pull/51)  
* Implemented by: Lucas Larson  
* Approved by: Jarom Craghead  
* Print screen:

![](/markdownImages/d6_5.png)
![](/markdownImages/d6_6.png)


   * Requirement: As a user, I want to switch the privacy of my notes, so that only I can see my private notes and all users can see my public notes.  
   *  Issue: [https://github.com/JCraghead/WebNotes/issues/50](https://github.com/JCraghead/WebNotes/issues/50)  
   *  Pull request: https://github.com/JCraghead/WebNotes/pull/48  
   *  Implemented by: Lucas Larson  
   *  Approved by: Jarom Craghead  
    * Print screen:

![](/markdownImages/d6_7.png)


# **Tests:**  
##   **Unit Tests:**  
* The test framework we chose to use is Jest. Using Jest allows us to test our scripts which use DOM functions by creating mock functions and objects using node packages such as JSDOM and Isomorphic-Fetch.  
* [Link to tests](https://github.com/JCraghead/WebNotes/tree/main/testing)   
* **Example Test: getNotesFromServer** This test goes as follows: First we set the global function fetch to be our mock fetch function. This uses the mock fetch function found in isomorphic-fetch and all of our tests also use the mock HTML document object constructed in sinon-chrome. We then check to make sure we have no sticky note elements. Then, we attempt to get notes from the server under URL “webnotes.space”. Our SQL database holds one note under that URL which has the note id of 177\. We then check to see if that note exists and clear all notes. If none of the asserts fail, then the test passes. By using these mock objects and functions we can simulate the chrome extension in our tests.

[Link to getNotesFromServer](https://github.com/JCraghead/WebNotes/blob/main/clientSide/scripts/content.js) - [Link to getNotesFromServer's test](https://github.com/JCraghead/WebNotes/blob/main/testing/content.test.js)

![](/markdownImages/d6_8.png)


##  **Acceptance Tests:**

* The test framework we chose to use is Selenium. Selenium allows us to simulate user interaction of WebNotes by recording sample inputs and running the tests automatically on development builds.  
* [Link to tests](https://github.com/JCraghead/WebNotes/tree/main/testing)  
* **Example Test: Create Single Public Note** This test works by simulating user input to create a new note, drag it, input text, and save it. First it clicks on the WebNotes menu item in Canvas. Then, it drags the new note to a new position on the screen. It then inserts sample text into the note, and saves it to the server. The test passes if all of the steps are executed.

[Link to acceptanceTests](https://github.com/JCraghead/WebNotes/blob/main/testing/acceptanceTests.side)

![](/markdownImages/d6_9.png)



# **Demo:**  
   This video showcases the key features of WebNotes in action, demonstrating the functionality and user interface of the application.  
   [https://youtu.be/Y1Drzw5x1R0](https://youtu.be/Y1Drzw5x1R0)  
# **Code Quality:**  
     
   We implemented a number of crucial procedures during the WebNotes project’s development to ensure high-quality code. Every pull request has been through a routine peer code review to guarantee that coding standards were followed. To encourage consistency throughout the codebase, we used PEP 8 rules for Python and ESLint with Airbnb's style guide for JavaScript. To guarantee dependability and reduce regressions, Test-Driven Development (TDD) was used, in which test cases were created prior to feature implementation. Style infractions were automatically detected and fixed with the use of static code analysis tools like Flake8 and Prettier.The modular framework of the project made components reusable and made debugging and future improvements easier. Maintaining a stable main branch and preventing merge conflicts were made possible by a disciplined version control process that included feature branches and pull requests. To make the codebase approachable to new contributors, comprehensive documentation and in-line comments were also included. Together, these procedures made sure that software was developed that was reliable, scalable, and maintained.   
     
     
# **Lessons Learned:**  
     
   During this project, the team learned a number of things regarding acceptance testing and user security. We learned how to implement acceptance tests and softwares to create them, and found ways to use account security as a method of protecting a user’s notes from malicious editing or deletion. If we were to continue this project, we would like to add methods of adding new accounts through some kind of sign in feature, as well as allowing the user to access all of their notes across all pages in one place.  
     
   