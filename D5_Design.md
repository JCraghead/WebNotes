# **1. Description**

WebNotes is intended to improve students' learning experiences by making note-taking and organization easier, especially for those who use platforms like Canvas. By enabling users to effectively record and organize information straight from their browser, this Chrome addon improves academic achievement. A variety of tools designed to enhance the digital note-taking experience are available in WebNotes. With the ability to organize and remove notes for a clutter-free workstation, users may quickly write new notes. Accessibility and efficiency are improved by the integrated search tool, which makes it possible to quickly retrieve particular notes. WebNotes has auto-save features that guarantee all changes are automatically saved in order to prevent data loss. A dark mode is also supported by the addon, making viewing in low light conditions more comfortable. All of these characteristics work together to make WebNotes a useful tool for students who want to simplify their study routine.


# **2. Architecture**  
![](/markdownImages/d5_1.png)

## Rationale:  
The system architecture was designed this way to easily show the difference of layers within the system and which roles each layer is responsible for. The system is split into four separate layers comprising the presentation layer, the application layer, the data layer, and the external layer. The presentation layer contains the user interface and the presentation logic responsible for managing and presenting the UI. This layer interacts with the application layer which is the core of the system and handles integrating the WebNotes chrome extension into the webpage. It is also responsible for the manipulation of notes such as creation and organization. For the application layer to work it uses the data layer which provides it with the ability to store and retrieve notes. Lastly the external layer contains all the foundational dependencies and services required for the software to run, including Google Chrome and APIs for storage. 

# **3. Class Diagram**  
![](/markdownImages/d5_2.png)

# **4. Sequence Diagram**
### **Use Case: Create Note**

Actor: Student  
Trigger: The student decides to create a new note  
Pre-conditions: The student has the extension installed  
Success Scenario:  
1\) The student opens the extension.   
2\) The student selects the “Add a new note” option.  
3\) The client sends a new note request to the python server  
4\) The server sends a query to add a new note to the SQL database   
5\) The database adds the new note   
6\) The server sends a query to the database for the new note and passes it to the client   
7\) The client displays the new note on the webpage

![](/markdownImages/d5_3.png)

# **5. Design Patterns**

## Public vs Private Notes: Strategy Design  
![](/markdownImages/d5_4.svg)

## Note JS Object and Note HTML Element: Bridge Design  
![](/markdownImages/d5_5.svg)


Both of the described patterns can be found in classes built in [content.js](https://github.com/JCraghead/WebNotes/blob/main/clientSide/scripts/content.js).
# **6. Design Principles**

The design of WebNotes adheres to several key softwares engineering principles to ensure maintainability, scalability, and robustness. 

Firstly, our system's architecture is based on the Single Responsibility Principle (SRP). WebNotes ensures a clear separation of responsibilities by giving each class a distinct, well-defined responsibility. For instance, controlling note-related features like making, editing, and displaying notes in the browser is entirely the responsibility of the StickyNote class. We can readily preserve and expand the note-taking capabilities without affecting other system components by separating these behaviors. Likewise, all database functions, such as establishing a connection to the MySQL database, running SQL queries, and retrieving data, are managed by the DatabaseService class. Our team can update the database logic without affecting the frontend code thanks to this modular architecture, which facilitates feature upgrades and debugging.

WebNotes is also designed according to the Open/Closed Principle (OCP), which leaves the system open for expansion but closed for change. This idea is essential for reducing the possibility of introducing faults into the system's stable components by enabling the addition of new features without changing the existing code. To manage updates pertaining to the tag-based search feature, for example, we have applied the Observer pattern. The related tags are immediately alerted when a user makes changes to a note so they may update their indexing and maintain the accuracy of the search. Without requiring changes to the core note management code, this adaptable approach enables the future inclusion of features like sophisticated search filters or tag management. Additionally, the strategy for handling different color themes or note styles can be easily extended by adding new strategy classes, allowing users to customize their note-taking experience further without disrupting existing functionalities.

In order to encourage code reuse and flexibility, WebNotes also adheres to the Liskov Substitution Principle (LSP). According to this principle, objects of a derived class can be used in place of objects of their base class without affecting the program's desired features. This opens the door for future improvements like multimedia notes or rich-text formatting by enabling the application to handle different note types consistently. By following LSP, we make sure that our extension can accommodate new note kinds without requiring major modifications to the current code.

Lastly, in order to reduce redundancy and improve code maintainability, we have carefully adhered to the Don't Repeat Yourself (DRY) philosophy. Utility methods and shared service classes contain common operations like note formatting, data validation, and user authentication. In addition to minimizing code duplication, this centralisation makes sure that any changes made to these shared features are immediately propagated throughout the application. For example, the system reuses the utility functions for database interaction, making code maintenance easier and consistency better.

By sticking to these design guidelines, WebNotes strikes a balance between flexibility and modularity, guaranteeing that the extension is both reliable and simple to update. This well-considered design supports our objective of developing a robust yet user-friendly note-taking tool for students and provides a strong basis for future improvements.
