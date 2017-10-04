# Node.js ToDo App #
This is a Node.js app that is a simple to do list.  The user inputs an item and submits it.  The text then goes to the 'Things to do' list.  The item has a button next to it to be clicked and move the item down to the 'Things Done' list.

To Run:
1. Clone the repository to your local files
2. In your CLI go to the folder you cloned down
3. Run ```npm install```
4. Run ```node index.js```
5. Go to your browser at address ```http://localhost:3000/```

Features:
* Uses bodyParser to parse the user input from the text box.
* Uses mustache to display arrays on the main page.
* Uses POST routes to move and remove items from different lists.
