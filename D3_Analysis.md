# Analysis

## 1\. System Description:

Managing digital notes is a challenge the WebNotes system attempts to solve, especially for students using platforms such as Canvas. Disorganized information frequently results in lost data and inefficiency. Students can make, modify, and arrange notes from their browser with the help of the Chrome Extension WebNotes. Its connection with web pages, in contrast to standard note-taking software, enables users to capture pertinent information in context, improving college students' academic achievement.  

When a new canvas site is first loaded, a new **WebPage** object is made holding the *URL* and an *array of the notes* present. Each **sticky note** has features like *color*, *stickyID*, *xPos*, *yPos,* and a ***tag** object* which holds all of the given *tags* for the note. These tags are essential for effectively organizing and searching notes. *Text* and *images* can be included in a **sticky note**'s **content**; the latter is specified by the **image**’s *source*, *format*, *height*, and *width*. There are numerous ways for a system **user**—identified by their *user ID*, *username*, and *password*—to interact with **sticky notes**. **Users** can ***collaborate*** with other **users** to create, modify, and ***comment*** on **sticky notes**. Our **user collaboration** class keeps track of each of the ***users*** and their *permissions* for editing the note, while the **comment** class contains its ***content*** and the ***user*** who commented. Among the many capabilities offered by the system are real-time auto-save, note exporting, and device syncing. It guarantees stable, excellent performance and usability, resulting in note management that is effective and customized to the demands of its users.

## 2\. Model:

![Class Diagram](/markdownImages/D3classDiagram.svg)