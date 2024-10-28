

# **Introduction**
  WebNotes enhances students' study experience by simplifying note taking and organization. Targeted at students who use canvas, it allows them to capture and manage information efficiently, and boosts their academic performance. WebNotes includes many features designed to enhance the digital note-taking experience for students. Users can easily create new notes directly from their browser, while the ability to delete notes helps to maintain an organized workspace. An integrated search function allows for quick retrieval of specific notes, improving accessibility. With an auto-save functionality, all changes are automatically saved, minimizing the risk of losing notes. Additionally, the extension provides a dark mode option, offering a comfortable viewing experience in low-light conditions.  
    
  Github: [https://github.com/JCraghead/WebNotes](https://github.com/JCraghead/WebNotes)

 # **Implemented Requirements**  
 ## Lucas Larson:  
  * Requirement: As a student, I want to create a new note quickly, so that I can easily store important information.  
  * Issue: [https://github.com/JCraghead/WebNotes/issues/4](https://github.com/JCraghead/WebNotes/issues/4)  
  * Pull request: [https://github.com/JCraghead/WebNotes/pull/15](https://github.com/JCraghead/WebNotes/pull/15)
  * Implemented by: Lucas Larson
  * Approved by: Jarom Craghead  
  * Print screen:

    ![](/markdownImages/d4_1.png)

  * Requirement: As a user, I want to delete no longer relevant notes, so that my notes can stay organized.  
  * Issue: [https://github.com/JCraghead/WebNotes/issues/12](https://github.com/JCraghead/WebNotes/issues/12)   
  * Pull request: [https://github.com/JCraghead/WebNotes/pull/15](https://github.com/JCraghead/WebNotes/pull/15)  
  * Implemented by: Lucas Larson
  * Approved by: Jarom Craghead  
  * Print screen: 

    ![](/markdownImages/d4_2.png)

    ![](/markdownImages/d4_3.png)

  * Requirement: As a student, I want to edit my existing notes, so that I can keep my notes up to date.  
  * Issue: [https://github.com/JCraghead/WebNotes/issues/5](https://github.com/JCraghead/WebNotes/issues/5)  
  * Pull request: [https://github.com/JCraghead/WebNotes/pull/16](https://github.com/JCraghead/WebNotes/pull/16)  
  * Implemented by: Lucas Larson
  * Approved by: Jarom Craghead  
  * Print screen: 

    ![](/markdownImages/d4_4.png)

    ![](/markdownImages/d4_5.png)

  * Requirement: As a user, I want my notes to auto save, so that I don’t lose information if there is an interruption.  
  * Issue: [https://github.com/JCraghead/WebNotes/issues/11](https://github.com/JCraghead/WebNotes/issues/11)  
  * Pull request: [https://github.com/JCraghead/WebNotes/pull/18](https://github.com/JCraghead/WebNotes/pull/18)  
  * Implemented by: Lucas Larson
  * Approved by: Avnish Sinha  
  * Print screen: 

    ![](/markdownImages/d4_6.png)

    ![](/markdownImages/d4_7.png)

## Jarom Craghead  
  * Requirement: As a user, I want my notes to sync across my devices, so that I can access my notes wherever I am.  
  * Issue: [https://github.com/JCraghead/WebNotes/issues/7](https://github.com/JCraghead/WebNotes/issues/7)  
  * Pull request: [https://github.com/JCraghead/WebNotes/pull/29](https://github.com/JCraghead/WebNotes/pull/29)  
  * Implemented by: Jarom Craghead
  * Approved by: Lucas Larson  
  * Print screen:

    ![](/markdownImages/d4_8.png)

    ![](/markdownImages/d4_9.png)

## Landon Coonrod  
  * Requirement: As a user, I want to search my notes based on tags, so that I can quickly locate specific information.  
  * Issue: [https://github.com/JCraghead/WebNotes/issues/9](https://github.com/JCraghead/WebNotes/issues/9)  
  * Pull request: [https://github.com/JCraghead/WebNotes/pull/33](https://github.com/JCraghead/WebNotes/pull/33)  
  * Implemented by: Landon Coonrod
  * Approved by: Jarom Craghead  
  * Print screen:

    ![](/markdownImages/d4_10.png)

    ![](/markdownImages/d4_11.png)

## Ronan DeGeyter  
  * Requirement: As a user, I want to switch the appearance of my notes, so that I can see them better in low light.  
  * Issue: [https://github.com/JCraghead/WebNotes/issues/42](https://github.com/JCraghead/WebNotes/issues/42)  
  * Pull request: [https://github.com/JCraghead/WebNotes/pull/36](https://github.com/JCraghead/WebNotes/pull/36)  
  * Implemented by: Ronan DeGeyter
  * Approved by: Lucas Larson  
  * Print screen:

    ![](/markdownImages/d4_12.png)

    ![](/markdownImages/d4_13.png)

  


# **Tests**  
1. The test framework we chose to use is Jest. Using Jest allows us to test our scripts which use DOM functions by creating mock functions and using node packages such as JSDOM and Isomorphic-Fetch.  
2. Link to tests on GitHub: \[link to github tests\]  
3. **Example Test: searchNotes** The test for searchNotes goes as follows: First, we create two new sticky notes with id’s one and two and assign them the innerText’s “search notes” and “secret note” respectively. We check to see that both of them are not highlighted. Then, by searching for “notes” we check to see if the first element is highlighted and the second is not. We search “note” next to see if both elements are highlighted. Finally, we search “secret” to ensure that only the second element is highlighted. We then clear the created notes before ending the test.

   \[link to content.js:searchNotes\]\[link to content.test.js\].

![](/markdownImages/d4_14.png)

# **Adopted Technologies**   
1. JavaScript: We chose JavaScript because it is a standard language for making extensions for Google Chrome.  
2. SQL: We chose SQL as it was a simple way to store information about all of our notes and request them when a page was loaded.  
3. Python: We chose python as it had functionality with both of our other languages and would serve as the perfect middleman between the two.  
4. Jest: We chose Jest as our testing framework because it offers unit testing for functions that involve DOM manipulation.  
5. AWS: We chose an AWS EC2 instance because it allows us to run our servers remotely and we can update and access files quickly without concerns about security.  
# **Learning/Training**  
1. Lucas did a lot of work developing Javascript and built a lot of the framework of the extension. Also learned how to deploy production ready servers to an AWS ec2 instance and the maintenance required for upkeep.  
2. Jarom learned about SQL in his CS345 class, using that to build onto Lucas’s work and merge the two ends of the system via Python.  
3. Avnish managed the GitHub Documentation like making CONTRIBUTING.md, code\_of\_conduct.md, and Readme.md as well. Also responsible for Licensing the project.   
4. Ronan has been learning Javascript and how to use Git properly as formerly has had little to no experience with either.   
5. Landon learned about the interactions between SQL and our python server.

# **Deployment**  
  [**https://www.webnotes.space/**](https://www.webnotes.space/)  
  Jarom deployed the SQL database to store all the data for notes. Landon created the initial base to the Flask python server. Jarom and Lucas developed the server to handle incoming requests and communicate with the SQL database. Lucas created a new AWS EC2 instance to remotely host the WebNotes server and serve static content such as the WebNotes landing page. Using nginx and gunicorn as a reverse proxy, our web traffic is redirected to our internal Flask server which communicates with the SQL database to view, create, delete, and edit sticky notes. This works by accepting POST requests to specific URLs on the server to send and receive data from the chrome extension and the SQL database. By accepting GET requests to our IP, we can serve static HTML for users to see when visiting [webnotes.space](https://webnotes.space/). Since Canvas uses HTTPS to secure internet traffic, our traffic must be secured as well for web browsers to accept this data. To do this, we purchased a domain name which points to our AWS server. Then, using Certbot and Let’s Encrypt, we were able to get a SSL certificate to securely transmit information to and from our server. Our server works by redirecting any HTTP traffic on port 80 to HTTPS on port 443.
  Our chrome extension has also been submitted to the Chrome Web Store and is regularly updated alongside GitHub. This allows end users to simply download the chrome extension and immediately use WebNotes on Canvas.

# **Licensing**  
    
  Because of its simplicity and adaptability, we decided to employ the MIT License for our WebNotes project. With only a few limitations, anybody can use, change, and distribute our code without restriction thanks to the MIT License. This is in line with our mission to promote community cooperation and creativity. The license is also a well-known and developer-friendly option for open-source projects since it limits liability and provides the team with legal protection.  
    
  We compared it with other licenses like GNU, Apache 2.0, and MPL 2.0:  
1. MIT License: Extremely non-restrictive, has no copyleft, and is widely used for maximum freedom.  
2. Apache License 2.0: Permissive with additional patent protection.  
3. GNU General Public License (GPL): Strong copyleft, all modifications must remain open-source.  
4. Mozilla Public License 2.0 (MPL): Weak copyleft, modified parts must stay open-source, but allows combining with proprietary code.  
   

Each license serves different goals, so the choice depends if someone wants to prioritize openness (GPL/MPL) or flexibility for commercial use (MIT/Apache 2.0).

# **README:**

Link for Readme.md:  
[https://github.com/JCraghead/WebNotes/blob/main/README.md](https://github.com/JCraghead/WebNotes/blob/main/README.md)  
Link for LICENSE.md:  
[https://github.com/JCraghead/WebNotes/blob/main/LICENSE](https://github.com/JCraghead/WebNotes/blob/main/LICENSE)  
Link for CONTRIBUTING.md:  
[https://github.com/JCraghead/WebNotes/blob/main/CONTRIBUTING.md](https://github.com/JCraghead/WebNotes/blob/main/CONTRIBUTING.md)  
Link for CODE OF CONDUCT:  
[https://github.com/JCraghead/WebNotes/blob/main/CODE\_OF\_CONDUCT.md](https://github.com/JCraghead/WebNotes/blob/main/CODE_OF_CONDUCT.md)

	

# **Look & Feel**  
  The user interface design focuses on simplicity and usability. We employed a clean layout with intuitive navigation, ensuring a seamless experience for users. On the left side of the Canvas tool bar, a Web Notes icon is displayed. This allows users quick access to the note creation feature. In the chrome extensions icon on Google Chrome, users can remove, search, add, and change the color of notes.  
  ![](/markdownImages/d4_15.png)![](/markdownImages/d4_16.png)
  ![](/markdownImages/d4_17.png)
    
# **Lessons learned**  
  Our team learned various lessons during the first release of Webnotes, which mainly include communication, testing and comprehensive understanding of the code base. First and foremost, we learned that maintaining clear communication throughout the group was essential to productivity. Situations where ideas only reached certain group members cause some confusion and delays in implementing features and getting functionality to the system. Creating tests for the software proved to be difficult and time consuming, as expected from writing tests. We learned from this however that creating tests will definitely help us in the long run because it allows us to test the code of specific sections without relying on the project as a whole. Another big lesson that we learned from this is that it is difficult to work on the project if everyone does not have a full understanding of everything in the system. Many times we ran into the problem that only some members of the group clearly understood certain aspects, meaning we had to spend time explaining and helping other members understand so we could all stay on track. Organization was also a small challenge that we encountered, but we overcame it rather quickly so that our documentation is more intuitive and accessible.


# **Demo:**  
  This video showcases the key features of WebNotes in action, demonstrating the functionality and user interface of the application.  
  [https://youtu.be/XntjeH9acuo](https://youtu.be/XntjeH9acuo)  
  